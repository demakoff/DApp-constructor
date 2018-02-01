const path = require('path');

module.exports = {
    entry: './index.ts',
    context: path.resolve(__dirname, 'src'),
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    }
};
