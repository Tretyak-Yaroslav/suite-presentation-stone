const path = require('path');
const zip = require('zip-a-folder');

const package = require('../package');

let src = path.resolve(__dirname, '../public');
let dest = path.resolve(__dirname, '../out', `${package.name}_${package.version}.zip`);

zip.zipFolder(src, dest, function() {
    console.log('done.');
});