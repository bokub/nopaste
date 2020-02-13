let copyElement = document.getElementById('copy');
const flask = new CodeFlask('#editor', { language: 'javascript', lineNumbers: true, defaultTheme: false });
const lzma = new LZMA('lzma.min.js');
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
        onChange: () => {
            updateLanguage();
        }
    });

    const urlParams = new URLSearchParams(window.location.search);
    select.set(Object.keys(languages).indexOf(urlParams.get('lang')) === -1 ? 'javascript' : urlParams.get('lang'));
    updateLanguage();
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

function updateLanguage() {
    const lang = select.selected();
    if (!Prism.languages.hasOwnProperty(lang)) {
        addLanguage(lang);
        return;
    }
    flask.updateLanguage(lang);
}

function addLanguage(lang) {
    // Add a setter to detect when a language is available
    Object.defineProperty(Prism.languages, lang, {
        set: function(val) {
            Prism.languages['_custom_' + lang] = val;
            flask.updateLanguage(lang);
        },
        get: function() {
            return Prism.languages['_custom_' + lang];
        }
    });

    const script = document.createElement('script');
    script.setAttribute('src', `https://cdn.jsdelivr.net/npm/prismjs@1.14.0/components/prism-${lang}.min.js`);
    document.getElementsByTagName('head')[0].appendChild(script);
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
