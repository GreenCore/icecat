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
const icecat = function (login, password, httpUrl = 'data.icecat.biz/xml_s3/xml_server3.cgi') {
    this.httpAuth = login + ':' + encodeURIComponent(password);
    this.VERSION = packagejson.version;
    this.httpUrl = httpUrl;
    this.openCatalog = new openCatalog(this);
};

module.exports = icecat;