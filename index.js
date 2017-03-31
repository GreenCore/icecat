/*!
 * Icecat API
 * MIT Licensed
 */
'use strict';

const openCatalog = require('./lib/OpenCatalog/service');

/**
 * Icecat instance constructor
 * @prototype
 * @class  Icecat
 */
const icecat = function(login, password){
    this.httpAuth = login + ':' + encodeURIComponent(password);
    this.VERSION = 1;
    this.scheme = 'https://';
    this.httpUrl = 'data.icecat.biz/xml_s3/xml_server3.cgi';

    this.openCatalog = new openCatalog(this);
}

module.exports = icecat;
