/*!
 * Icecat API
 * MIT Licensed
 */
'use strict';
const packagejson = require('./package.json');
const openCatalog = require('./lib/OpenCatalog/service');

/**
 * Icecat instance constructor
 * @prototype
 * @class  Icecat
 */
const icecat = function (username, password, httpUrl = 'data.icecat.biz/xml_s3/xml_server3.cgi') {
    this.VERSION = packagejson.version;
    this.scheme = 'https://';
    this.username = username;
    this.password = password;
    this.httpUrl = httpUrl;
    this.openCatalog = new openCatalog(this);
};

module.exports = icecat;