const path = require('path');

module.exports = env => {
    return {
        entry: ['babel-polyfill', './src/app.js'],
        output: {
            path: path.join(__dirname, 'dist', 'bundles'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                use: ['style-loader', 'css-loader', 'sass-loader'],
                test: /\.s?css$/
            }
        ]
        },
        devtool: 'cheap-module-eval-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            publicPath: '/bundles/',
            open: true,
            openPage: '',
            historyApiFallback: true
        }
    }
}