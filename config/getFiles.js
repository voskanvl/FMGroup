const fs = require('fs');
const path = require('path');

const getAllPugs = dir =>
    fs
        .readdirSync(dir)
        .filter(file => file.match(/.pug/g))
        .map(file => ({
            pug: dir + '/' + file,
            html: file.replace(/.pug/, '.html'),
        }));
//return {pug:string,html:string}[]

// const getAllHtmlWebpackPlugin = dir =>
//     getAllPugs(dir).map(
//         ({ pug: template, html: filename }) =>
//             new HtmlWebpackPlugin({
//                 template,
//                 filename,
//             }),
//     );

console.log(getAllPugs(process.argv[2]));
