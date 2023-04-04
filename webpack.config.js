const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry:"./src/index.ts",
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:"bundle.js",
        environment:{
            //Compatible avec IE, webpack n'utilise pas arrow function
            arrowFunction:false,
            // Compatible avec IE, n'utilise pas es6
            const: false
        }
    },
    mode: 'development',
    //module webpack
    module:{
        
        //loader rules
        rules: [
            {
            //include file's extension
            test:/\.ts$/,
            //use loader
            use:[
                {
                    //assign loader
                    loader:"babel-loader",
                    //setup babel
                    options:{
                        //preset envirement
                        presets:[
                            [
                                //assign preset module
                                "@babel/preset-env",
                                //preset info
                                {
                                    //navigateur compatible
                                    targets:{
                                        "chrome":"88"
                                    },
                                    //core-js version
                                    "corejs":"3",
                                    //
                                }
                            ]
                        ]
                    }
                },
                'ts-loader'
            ],
            //exclude file or dir
            exclude: /node-modules/
            },
            //setup sass
            {
                test:/\.scss$/,
                use:[
                    "style-loader",
                    "css-loader",
                    {
                        loader:"postcss-loader",
                        options:{
                            postcssOptions:{
                                plugins:[
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers:'last 4 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "sass-loader"
                ]
            } 
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
    ],
    //Exporter et importer module
    resolve: {
        extensions: ['.ts','.js']
    }
}