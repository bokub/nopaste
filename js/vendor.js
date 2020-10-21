// LZMA
import { LZMA } from 'lzma/src/lzma';
import lzmaWorker from 'raw-loader!lzma/src/lzma_worker.js';

const blob = new Blob([lzmaWorker]);
const lzma = new LZMA(window.URL.createObjectURL(blob));
window.lzma = lzma;

// Codemirror & Addons
window.CodeMirror = require('codemirror');
require('codemirror/addon/mode/overlay');
require('codemirror/addon/mode/multiplex');
require('codemirror/addon/mode/simple');
require('codemirror/addon/scroll/simplescrollbars');
require('codemirror/mode/meta');

// Other dependencies
window.SlimSelect = require('slim-select');
window.ClipboardJS = require('clipboard');
window.MicroModal = require('micromodal');

// Override codemirror loadmode addon: https://github.com/codemirror/CodeMirror/blob/master/addon/mode/loadmode.js
const loading = {};

function splitCallback(cont, n) {
    let countDown = n;
    return function () {
        if (--countDown === 0) cont();
    };
}

function ensureDeps(mode, cont) {
    const deps = CodeMirror.modes[mode].dependencies;
    if (!deps) return cont();
    const missing = [];
    for (let i = 0; i < deps.length; ++i) {
        if (!CodeMirror.modes.hasOwnProperty(deps[i])) missing.push(deps[i]);
    }
    if (!missing.length) return cont();
    const split = splitCallback(cont, missing.length);
    for (let i = 0; i < missing.length; ++i) CodeMirror.requireMode(missing[i], split);
}

CodeMirror.requireMode = function (mode, cont) {
    if (typeof mode !== 'string') mode = mode.name;
    if (CodeMirror.modes.hasOwnProperty(mode)) return ensureDeps(mode, cont);
    if (loading.hasOwnProperty(mode)) return loading[mode].push(cont);

    const file = CodeMirror.modeURL.replace(/%N/g, mode);

    const script = document.createElement('script');
    script.src = file;
    const others = document.getElementsByTagName('script')[0];
    const list = (loading[mode] = [cont]);

    CodeMirror.on(script, 'load', function () {
        ensureDeps(mode, function () {
            for (let i = 0; i < list.length; ++i) list[i]();
        });
    });

    others.parentNode.insertBefore(script, others);
};

CodeMirror.autoLoadMode = function (instance, mode) {
    if (CodeMirror.modes.hasOwnProperty(mode)) return;

    CodeMirror.requireMode(mode, function () {
        instance.setOption('mode', instance.getOption('mode'));
    });
};
