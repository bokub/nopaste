const blob = new Blob(['importScripts("https://cdn.jsdelivr.net/npm/lzma@2.3.2/src/lzma_worker.min.js");']);
const lzma = new LZMA(window.URL.createObjectURL(blob));

let editor = null;
let select = null;
let clipboard = null;
let statsEl = null;

const initCodeEditor = (initialValue) => {
    CodeMirror.modeURL = 'https://cdn.jsdelivr.net/npm/codemirror@5.52.0/mode/%N/%N.js';
    editor = new CodeMirror(byId('editor'), {
        lineNumbers: true,
        theme: 'dracula',
        readOnly: readOnly,
        lineWrapping: false,
        scrollbarStyle: 'simple',
        value: initialValue,
    });
    if (readOnly) {
        document.body.classList.add('readonly');
    }

    statsEl = byId('stats');
    statsEl.innerHTML = `Length: ${initialValue.length} |  Lines: ${editor['doc'].size}`;
    editor.on('change', () => {
        statsEl.innerHTML = `Length: ${editor.getValue().length} |  Lines: ${editor['doc'].size}`;
    });
    initLangSelector();
};

const initLangSelector = () => {
    select = new SlimSelect({
        select: '#language',
        data: CodeMirror.modeInfo.map((e) => ({
            text: e.name,
            value: slugify(e.name),
            data: { mime: e.mime, mode: e.mode },
        })),
        showContent: 'down',
        onChange: (e) => {
            const language = e.data || { mime: null, mode: null };
            editor.setOption('mode', language.mime);
            CodeMirror.autoLoadMode(editor, language.mode);
        },
    });

    select.set(decodeURIComponent(new URLSearchParams(window.location.search).get('lang') || 'plain-text'));
};

const initCode = () => {
    const base64 = location.pathname.substr(1) || location.hash.substr(1);
    if (base64.length === 0) {
        initCodeEditor('');
        return;
    }
    decompress(base64, (code, err) => {
        if (err) {
            alert('Failed to decompress data: ' + err);
            initCodeEditor('');
            return;
        }
        initCodeEditor(code);
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
    const query = `?lang=${encodeURIComponent(select.selected())}`;
    const url = rawData.length <= 4000 ? base + rawData + query : base + query + '#' + rawData;
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

/* Only for tests purposes */
const testAllModes = () => {
    for (const [index, language] of Object.entries(CodeMirror.modeInfo)) {
        setTimeout(() => {
            console.info(language.name);
            select.set(slugify(language.name));
        }, 1000 * index);
    }
};

initCode(); // Will decode URL, create code editor, and language selector
initClipboard();
