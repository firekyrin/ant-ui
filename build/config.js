var Components = require('../components.json');
var path = require('path');
var dependencies = require('../package.json').dependencies;
var externals = {};

Object.keys(Components).forEach(function(key) {
    externals[`ant-ui/packages/${key}/index.js`] = `ant-ui/lib/${key}`;
    externals[`ant-ui/packages/${key}/index.js`] = `ant-ui/lib/${key}/style.css`;
});
Object.keys(dependencies).forEach(function(key) {
    externals[key] = key;
});

exports.externals = Object.assign({
    vue: {
        root: 'Vue',
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue'
    }
}, externals);

exports.alias = {
    'ant-ui': path.join(__dirname, '..'),
    'src': path.join(__dirname, '../src')
};

exports.jsexclude = /node_modules|lib/;

exports.extends = ['vue2', 'saladcss', 'buble'];
