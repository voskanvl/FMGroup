const HtmlWebpackPlugin = require("html-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const paths = require("./webpack.paths");
const fs = require("fs");
const path = require("path");

const getAllPugs = dir =>
    fs
        .readdirSync(dir)
        .filter(file => file.match(/.pug/g))
        .map(
            file =>
                new HtmlWebpackPlugin({
                    template: dir + "/" + file,
                    filename: file.replace(/.pug/, ".html"),
                }),
        );

module.exports = {
    plugins: [
        ...getAllPugs("./src/pug/page"),
        new SpriteLoaderPlugin({
            plainSprite: true,
        }),
    ],
    entry: `${paths.src}/index.js`,
    // entry: {
    //     "bundle-home": `${paths.src}/index.js`,
    //     "bundle-conatcts": `${paths.src}/js/pages/contacts.js`,
    //     "bundle-production": `${paths.src}/js/pages/production.js`,
    //     "bundle-articles": `${paths.src}/js/pages/articles.js`,
    // },
    output: {
        path: paths.dist,
        filename: "assets/js/[name].[contenthash].js",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                    },
                },
            },
            {
                // test: /\.pug$/,
                // use: [
                //     {
                //         loader: "pug-loader",
                //     },
                // ],
                test: /\.pug$/,
                use: [
                    {
                        loader: "html-loader",
                    },
                    {
                        loader: "pug-html-loader",
                        options: {
                            exports: false,
                        },
                    },
                ],
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {
                    filename: "assets/fonts/[contenthash][ext][query]",
                },
            },
            // {
            //     test: /\.svg$/,
            //     use: [
            //         {
            //             loader: 'svg-sprite-loader',
            //             options: {
            //                 extract: true,
            //                 spriteFilename: `/assets/img/sprite.svg`,
            //             },
            //         },
            //         {
            //             loader: 'svgo-loader',
            //             options: {
            //                 plugins: [
            //                     {
            //                         name: 'removeAttrs',
            //                         params: {
            //                             attrs: [
            //                                 'fill',
            //                                 'fill-rule',
            //                                 'path:fill',
            //                                 'path:class',
            //                                 'path:stroke',
            //                             ],
            //                         },
            //                     },
            //                 ],
            //             },
            //         },
            //     ],
            // },
        ],
    },
    resolve: {
        alias: {
            assets: path.resolve(__dirname, "src/assets"),
            sass: path.join(__dirname, "src/sass"),
            img: path.resolve(__dirname, "src/assets/img"),
            svg: path.resolve(__dirname, "src/assets/svg"),
            components: path.resolve(__dirname, "src/components"),
        },
    },
};
