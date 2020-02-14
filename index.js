let copyElement = document.getElementById('copy');
const flask = new CodeFlask('#editor', { language: 'javascript', lineNumbers: true, defaultTheme: false });
const lzma = new LZMA('lzma.min.js');
Prism.plugins.autoloader.languages_path = 'https://cdn.jsdelivr.net/npm/prismjs@1.14.0/components/';
let select;

function init() {
    initLangSelector();
    initCode();
    const clipboard = new ClipboardJS('.clipboard');
    clipboard.on('success', function() {
        copyElement.style.display = 'none';
    });
}

function initLangSelector() {
    select = new SlimSelect({
        select: '#language',
        data: Object.entries(languages).map(([value, text]) => ({ text, value })),
        showContent: 'up',
        onChange: e => {
            console.log(e.value);
            flask.updateLanguage(e.value);
        }
    });

    const urlParams = new URLSearchParams(window.location.search);
    select.set(Object.keys(languages).indexOf(urlParams.get('lang')) === -1 ? 'javascript' : urlParams.get('lang'));
}

function initCode() {
    const base64 = location.hash.substr(1);
    if (base64.length === 0) {
        return;
    }

    if (!fetch) {
        alert('Your browser does not support this page.  Sorry! :(');
        return;
    }

    fetch('data:application/octet-stream;base64,' + base64)
        .then(r => r.blob())
        .then(function(blob) {
            const reader = new FileReader();
            reader.onload = function() {
                lzma.decompress(Array.from(new Uint8Array(reader.result)), function(plaintext, error) {
                    if (error) {
                        alert('Failed to decompress data: ' + error);
                        return;
                    }
                    flask.updateCode(plaintext);
                });
            };
            reader.readAsArrayBuffer(blob);
        });
}

function generateLink() {
    const code = flask.getCode();
    lzma.compress(code, 1, function(compressed, error) {
        if (error) {
            alert('Failed to compress data: ' + error);
            return;
        }
        const reader = new FileReader();
        reader.onload = function() {
            const base64 = reader.result.substr(reader.result.indexOf(',') + 1);
            const url = `${location.protocol}//${location.host}${
                location.pathname
            }?lang=${select.selected()}#${base64}`;
            document.getElementById('copy-link').value = url;
            copyElement.style.display = 'block';
        };
        reader.readAsDataURL(new Blob([new Uint8Array(compressed)]));
    });
}

init();
