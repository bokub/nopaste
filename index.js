const lzma = new LZMA('lzma.min.js');
let editor = null;
let select = null;
let clipboard = null;

const init = () => {
    initCodeEditor();
    initLangSelector();
    initCode();
    initClipboard();
};

const initCodeEditor = () => {
    CodeMirror.modeURL = 'https://cdn.jsdelivr.net/npm/codemirror@5.51.0/mode/%N/%N.js';
    editor = new CodeMirror(document.getElementById('editor'), {
        lineNumbers: true,
        theme: 'dracula'
    });
};

const initLangSelector = () => {
    select = new SlimSelect({
        select: '#language',
        data: CodeMirror.modeInfo.map(e => ({
            text: e.name,
            value: slugify(e.name),
            data: { mime: e.mime, mode: e.mode }
        })),
        showContent: 'up',
        onChange: e => {
            const language = e.data || { mime: null, mode: null };
            editor.setOption('mode', language.mime);
            CodeMirror.autoLoadMode(editor, language.mode);
        }
    });

    const urlParams = new URLSearchParams(window.location.search);
    select.set(decodeURIComponent(urlParams.get('lang') || 'plain-text'));
};

const initCode = () => {
    const base64 = location.hash.substr(1);
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

const generateLink = () => {
    compress(editor.getValue(), (base64, err) => {
        if (err) {
            alert('Failed to compress data: ' + err);
            return;
        }
        const url = buildUrl(base64);
        showCopyBar(url);
    });
};

// Open the "Copy" bar and select the content
const showCopyBar = dataToCopy => {
    const linkInput = document.getElementById('copy-link');
    linkInput.value = dataToCopy;
    linkInput.setSelectionRange(0, dataToCopy.length);
    document.getElementById('copy').style.display = 'flex';
};

// Close the "Copy" bar
const hideCopyBar = success => {
    const copyButton = document.getElementById('copy-btn');
    const copyBar = document.getElementById('copy');
    if (!success) {
        copyBar.style.display = 'none';
        return;
    }
    copyButton.innerText = 'Copied !';
    setTimeout(() => {
        copyBar.style.display = 'none';
        copyButton.innerText = 'Copy';
    }, 800);
};

// Build a shareable URL
const buildUrl = rawData => {
    return `${location.protocol}//${location.host}${location.pathname}?lang=${encodeURIComponent(
        select.selected()
    )}#${rawData}`;
};

// Transform a compressed base64 string into a plain text string
const decompress = (base64, cb) => {
    const progressBar = document.getElementById('progress');

    const req = new XMLHttpRequest();
    req.open('GET', 'data:application/octet;base64,' + base64);
    req.responseType = 'arraybuffer';
    req.onload = e => {
        lzma.decompress(
            new Uint8Array(e.target.response),
            (result, err) => {
                progressBar.style.width = '0';
                cb(result, err);
            },
            progress => {
                progressBar.style.width = 100 * progress + '%';
            }
        );
    };
    req.send();
};

// Transform a plain text string into a compressed base64 string
const compress = (str, cb) => {
    const progressBar = document.getElementById('progress');

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
        progress => {
            progressBar.style.width = 100 * progress + '%';
        }
    );
};

const slugify = str =>
    str
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/\+/g, '-p')
        .replace(/#/g, '-sharp')
        .replace(/[^\w\-]+/g, '');

init();
