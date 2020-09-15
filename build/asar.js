const path = require('path');
const asar = require('asar');

const package = require('../package');

let src = path.resolve(__dirname, '../public');
let dest = path.resolve(__dirname, '../out', `${package.name}_${package.version}.asar`);

asar.createPackage(src, dest, function() {
    console.log('done.');
});