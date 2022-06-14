const blob = new Blob(['importScripts("https://cdn.jsdelivr.net/npm/lzma@2.3.2/src/lzma_worker.min.js");']);
const lzma = new LZMA(window.URL.createObjectURL(blob));

let editor = null;
let select = null;
let clipboard = null;
let statsEl = null;

const init = () => {
    handleLegacyUrl();
    initCodeEditor();
    initLangSelector();
    initCode();
    initClipboard();
    initModals();
};

const initCodeEditor = () => {
    CodeMirror.modeURL = 'https://cdn.jsdelivr.net/npm/codemirror@5.65.5/mode/%N/%N.js';
    editor = new CodeMirror(byId('editor'), {
        lineNumbers: true,
        theme: 'dracula',
        readOnly: readOnly,
        lineWrapping: false,
        scrollbarStyle: 'simple',
    });
    if (readOnly) {
        document.body.classList.add('readonly');
    }

    statsEl = byId('stats');
    editor.on('change', () => {
        statsEl.innerHTML = `Length: ${editor.getValue().length} |  Lines: ${editor['doc'].size}`;
        hideCopyBar();
    });
};

const initLangSelector = () => {
    select = new SlimSelect({
        select: '#language',
        data: CodeMirror.modeInfo.map((e) => ({
            text: e.name,
            value: shorten(e.name),
            data: { mime: e.mime, mode: e.mode },
        })),
        showContent: 'down',
        onChange: (e) => {
            const language = e.data || { mime: null, mode: null };
            editor.setOption('mode', language.mime);
            CodeMirror.autoLoadMode(editor, language.mode);
            document.title = e.text && e.text !== 'Plain Text' ? `NoPaste - ${e.text} code snippet` : 'NoPaste';
        },
    });

    // Set lang selector
    const l = new URLSearchParams(window.location.search).get('l');
    select.set(l ? decodeURIComponent(l) : shorten('Plain Text'));
};

const initCode = () => {
    let base64 = location.hash.substr(1);
    if (base64.length === 0) {
        return;
    }
    decompress(base64, (code, err) => {
        if (err) {
            console.error('Failed to decompress data: ' + err);
            MicroModal.show('error-modal');
            return;
        }
        editor.setValue(code);
    });
};

const handleLegacyUrl = () => {
    const lang = new URLSearchParams(window.location.search).get('lang');
    const base = `${location.protocol}//${location.host}`;
    if (location.hash.charAt(5) === '-') {
        const hashedLang = location.hash.substr(1, 4);
        const newLang = CodeMirror.modeInfo.find((e) => hash(e.name) === hashedLang);
        const queryParams = newLang ? '?l=' + shorten(newLang.name) : '';
        location.replace(`${base}/${queryParams}#${location.hash.substr(6)}`);
        throw new Error('waiting for page to reload');
    }
    if (lang) {
        location.replace(`${base}/${'?l=' + shorten(lang)}${location.hash}`);
        throw new Error('waiting for page to reload');
    }
};

const initClipboard = () => {
    clipboard = new ClipboardJS('.clipboard');
    clipboard.on('success', () => {
        hideCopyBar(true);
    });
};

const initModals = () => {
    MicroModal.init({
        onClose: () => editor.focus(),
    });
};

const generateLink = (mode) => {
    const data = editor.getValue();
    compress(data, (base64, err) => {
        if (err) {
            alert('Failed to compress data: ' + err);
            return;
        }
        const url = buildUrl(base64, mode);
        statsEl.innerHTML = `Data length: ${data.length} |  Link length: ${url.length} | Compression ratio: ${Math.round(
            (100 * url.length) / data.length
        )}%`;

        showCopyBar(url);
    });
};

// Open the "Copy" bar and select the content
const showCopyBar = (dataToCopy) => {
    byId('copy').classList.remove('hidden');
    const linkInput = byId('copy-link');
    linkInput.value = dataToCopy;
    linkInput.focus();
    linkInput.setSelectionRange(0, dataToCopy.length);
};

// Close the "Copy" bar
const hideCopyBar = (success) => {
    const copyButton = byId('copy-btn');
    const copyBar = byId('copy');
    if (!success) {
        copyBar.classList.add('hidden');
        return;
    }
    copyButton.innerText = 'Copied !';
    setTimeout(() => {
        copyBar.classList.add('hidden');
        copyButton.innerText = 'Copy';
    }, 800);
};

const disableLineWrapping = () => {
    byId('disable-line-wrapping').classList.add('hidden');
    byId('enable-line-wrapping').classList.remove('hidden');
    editor.setOption('lineWrapping', false);
};

const enableLineWrapping = () => {
    byId('enable-line-wrapping').classList.add('hidden');
    byId('disable-line-wrapping').classList.remove('hidden');
    editor.setOption('lineWrapping', true);
};

const openInNewTab = () => {
    window.open(location.href.replace(/[?&]readonly/, ''));
};

// Build a shareable URL
const buildUrl = (rawData, mode) => {
    const base = `${location.protocol}//${location.host}${location.pathname}`;
    const query = shorten('Plain Text') === select.selected() ? '' : `?l=${encodeURIComponent(select.selected())}`;
    const url = base + query + '#' + rawData;
    if (mode === 'markdown') {
        return `[NoPaste snippet](${url})`;
    }
    if (mode === 'iframe') {
        const height = editor['doc'].height + 45;
        return `<iframe width="100%" height="${height}" frameborder="0" src="${url}"></iframe>`;
    }
    return url;
};

// Transform a compressed base64 string into a plain text string
const decompress = (base64, cb) => {
    const progressBar = byId('progress');

    const req = new XMLHttpRequest();
    req.open('GET', 'data:application/octet;base64,' + base64);
    req.responseType = 'arraybuffer';
    req.onload = (e) => {
        lzma.decompress(
            new Uint8Array(e.target.response),
            (result, err) => {
                progressBar.style.width = '0';
                cb(result, err);
            },
            (progress) => {
                progressBar.style.width = 100 * progress + '%';
            }
        );
    };
    req.send();
};

// Transform a plain text string into a compressed base64 string
const compress = (str, cb) => {
    if (str.length === 0) {
        cb('');
        return;
    }
    const progressBar = byId('progress');

    lzma.compress(
        str,
        1,
        (compressed, err) => {
            if (err) {
                progressBar.style.width = '0';
                cb(compressed, err);
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                progressBar.style.width = '0';
                cb(reader.result.substr(reader.result.indexOf(',') + 1));
            };
            reader.readAsDataURL(new Blob([new Uint8Array(compressed)]));
        },
        (progress) => {
            progressBar.style.width = 100 * progress + '%';
        }
    );
};

const slugify = (str) =>
    str
        .trim()
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/\+/g, '-p')
        .replace(/#/g, '-sharp')
        .replace(/[^\w\-]+/g, '');

const shorten = (name) => {
    let n = slugify(name).replace('script', '-s').replace('python', 'py');
    const nov = (s) => s[0] + s.substr(1).replace(/[aeiouy-]/g, '');
    if (n.replace(/-/g, '').length <= 4) {
        return n.replace(/-/g, '');
    }
    if (n.split('-').length >= 2) {
        return n
            .split('-')
            .map((x) => nov(x.substr(0, 2)))
            .join('')
            .substr(0, 4);
    }
    n = nov(n);
    if (n.length <= 4) {
        return n;
    }
    return n.substr(0, 2) + n.substr(n.length - 2, 2);
};

const byId = (id) => document.getElementById(id);

// Legacy code, only for retro-compatibility
const hash = function (str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed;
    let h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    const h = 4294967296 * (2097151 & h2) + (h1 >>> 0);
    return h.toString(36).substr(0, 4).toUpperCase();
};

// Only for tests purposes
const testAllModes = () => {
    for (const [index, language] of Object.entries(CodeMirror.modeInfo)) {
        CodeMirror.autoLoadMode(editor, language.mode);
        setTimeout(() => {
            console.info(language.name);
            select.set(shorten(language.name));
        }, 1000 * index);
    }
};

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}

init();
