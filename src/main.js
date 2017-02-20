"use strict";
var react_dom_1 = require('react-dom');
var update_1 = require('./backend/update');
var language_1 = require('./backend/language');
var manifest_1 = require('./backend/manifest');
var constants_1 = require('./constants');
var titleDOM = document.getElementsByTagName('title')[0];
titleDOM.innerText = constants_1.APP_NAME;
manifest_1.default.loadFromDisk().then(function (manifest) {
    if (manifest.language) {
        language_1.default.setLocale(manifest.language);
    }
    react_dom_1.default.render(manifest, { manifest: manifest } /  > , document.getElementById('app'));
});
update_1.default(false);
