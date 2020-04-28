const blob = new Blob(['importScripts("https://cdn.jsdelivr.net/npm/lzma@2.3.2/src/lzma_worker.min.js");']);
const lzma = new LZMA(window.URL.createObjectURL(blob));

let editor = null;
let select = null;
let clipboard = null;
let statsEl = null;

const init = () => {
    initCodeEditor();
    initLangSelector();
    initCode();
    initClipboard();
};

const initCodeEditor = () => {
    CodeMirror.modeURL = 'https://cdn.jsdelivr.net/npm/codemirror@5.52.0/mode/%N/%N.js';
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
            value: hash(e.name),
            data: { mime: e.mime, mode: e.mode },
        })),
        showContent: 'down',
        onChange: (e) => {
            const language = e.data || { mime: null, mode: null };
            editor.setOption('mode', language.mime);
            CodeMirror.autoLoadMode(editor, language.mode);
        },
    });

    // Retro-compatibility
    const legacyLang = new URLSearchParams(window.location.search).get('lang');
    if (legacyLang) {
        const langObj = CodeMirror.modeInfo.find((e) => slugify(e.name) === legacyLang);
        if (langObj) {
            select.set(hash(langObj.name));
            return;
        }
    }
    // Set lang selector
    select.set(window.location.hash.charAt(5) === '-' ? window.location.hash.substr(1, 4) : hash('Plain Text'));
};

const initCode = () => {
    let base64 = location.pathname.substr(1) || location.hash.substr(1);
    if (base64.charAt(4) === '-') {
        base64 = base64.substr(5);
    }
    if (base64.length === 0) {
        return;
    }
    decompress(base64, (code, err) => {
        if (err) {
            alert('Failed to decompress data: ' + err);
            return;
        }
        editor.setValue(code);
    });
};

const initClipboard = () => {
    clipboard = new ClipboardJS('.clipboard');
    clipboard.on('success', () => {
        hideCopyBar(true);
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
        statsEl.innerHTML = `Data length: ${data.length} |  Link length: ${
            url.length
        } | Compression ratio: ${Math.round((100 * url.length) / data.length)}%`;

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
    window.open(location.href.replace('&readonly', ''));
};

// Build a shareable URL
const buildUrl = (rawData, mode) => {
    const base = `${location.protocol}//${location.host}/`;
    const lang = hash('Plain Text') === select.selected() ? '' : select.selected() + '-';
    const url = base + '#' + lang + rawData;
    if (mode === 'markdown') {
        return `[NoPaste snippet](${url})`;
    }
    if (mode === 'iframe') {
        const height = Math.min(editor['doc'].height + 45, 800);
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
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/\+/g, '-p')
        .replace(/#/g, '-sharp')
        .replace(/[^\w\-]+/g, '');

const byId = (id) => document.getElementById(id);

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

/* Only for tests purposes */
const testAllModes = () => {
    for (const [index, language] of Object.entries(CodeMirror.modeInfo)) {
        setTimeout(() => {
            console.info(language.name);
            select.set(slugify(language.name));
        }, 1000 * index);
    }
};

/* Only for tests purposes */
const testHashCollisions = () => {
    const hashes = {};
    console.time('Hash test');
    for (const lang of CodeMirror.modeInfo) {
        const hashed = hash(lang.name);
        if (hashes[hashed]) {
            console.error(`${lang.name} and ${hashes[hashed]} share the same hash: ${hashed}`);
        }
        hashes[hashed] = lang.name;
    }
    console.timeEnd('Hash test');
};

init();
