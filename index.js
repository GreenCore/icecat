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
const icecat = function (username, password, httpUri = 'data.icecat.biz', path = '/xml_s3/xml_server3.cgi') {
    this.VERSION = packagejson.version;
    this.port = 443;
    this.username = username;
    this.password = password;
    this.httpUri = httpUri;
    this.path = path;
    this.openCatalog = new openCatalog(this);
};

module.exports = icecat;