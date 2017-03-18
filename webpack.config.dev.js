import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import path from 'path';

export default {
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json'],
        modules: [
            'node_modules',
            path.resolve(__dirname, 'src'),
        ],
    },

    // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps
    // and https://webpack.github.io/docs/configuration.html#devtool
    devtool: 'eval-source-map',

    entry: [
        // must be first entry to properly set public path
        './src/webpack-public-path',
        'webpack-hot-middleware/client?reload=true',

        // Defining path seems necessary for this to work consistently on Windows machines.
        path.resolve(__dirname, 'src/index.js'),
    ],
    target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
    output: {
        path: path.resolve(__dirname, 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
        publicPath: '/',
        filename: 'bundle.js',
    },
    plugins: [
        new webpack.DefinePlugin({
            // Tells React to build in either dev or prod modes.
            // https://facebook.github.io/react/downloads.html (See bottom)
            'process.env.NODE_ENV': JSON.stringify('development'),

            __DEV__: true,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({     // Create HTML file that includes references to bundled CSS and JS.
            template: 'src/index.ejs',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            },
            inject: true,
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: false,
            debug: true,
            noInfo: true, // set to false to see a list of every file being bundled.
            options: {
                sassLoader: {
                    includePaths: [path.resolve(__dirname, 'src', 'scss')],
                },
                context: '/',
                postcss: () => [autoprefixer],
            },
        }),
    ],
    module: {
        rules: [
            { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel-loader'] },
            { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader' },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
            { test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
            { test: /\.(jpe?g|png|gif)$/i, loader: 'file-loader?name=[name].[ext]' },
            { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' },
            {
                test: /\.module\.(css|scss|sass)$/,
                loaders: [
                    'style-loader',
                    'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                    'postcss-loader',
                    'sass-loader?sourceMap',
                ],
            },
            {
                test: /^((?!\.module).)*(css|scss|sass)$/,
                loaders: ['style-loader', 'css-loader?sourceMap', 'postcss-loader', 'sass-loader?sourceMap'],
            },
        ],
    },
};
