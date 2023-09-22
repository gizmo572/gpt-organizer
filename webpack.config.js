const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        index: './client/index.js'
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js'
    },
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,    //1)massive folder 2)doesn't need to be transformed
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      '@babel/preset-env',
                      '@babel/preset-react'
                    ]
                  }
                }
            },
            {
                test: /.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, './build'),
        },
        proxy: {
            '/log-in': 'http://localhost:3000',
            '/chat': 'http://localhost:3000',
            '/save': 'http://localhost:3000',
            '/sign-up': 'http://localhost:3000'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './client/index.html'
        })
    ]

}