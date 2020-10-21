const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './js/vendor.js',
    output: {
        filename: 'vendor.min.js',
        path: path.resolve(__dirname, 'js'),
    },
    // module: {
    //     rules: [
    //         {
    //             test: /lzma_worker.js\.js$/,
    //             loader: 'worker-loader',
    //             options: {
    //                 inline: 'no-fallback',
    //             },
    //         },
    //     ],
    // },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: 'node_modules/lzma/src/lzma_worker.js', to: 'vendor' }],
        }),
    ],
};
