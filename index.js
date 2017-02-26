/*!
 * Icecat API
 * MIT Licensed
 */
'use strict';

const Promise = require('bluebird');
const https = require('https');
const icecatFormat = require('./lib/OpenCatalog/icecat');


/**
 * Icecat instance constructor
 * @prototype
 * @class  Icecat
 */
function icecat(login, password, lang, ean) {
    var version = 1;
    var mode = 'read';

    var httpAuth = login + ':' + encodeURI(password);
    var httpUrl = 'data.icecat.biz/xml_s3/xml_server3.cgi';

    var argEanUpc = 'ean_upc=' + ean;
    var argOutput = ';lang=' + lang + ';output=productxml';

    var httpRequestUrl = 'https://' +
        httpAuth + '@' +
        httpUrl + '?' +
        argEanUpc +
        argOutput;

    var request = https.get(httpRequestUrl, function (response) {
        var body = '';
        response.on('data', function (chunk) {
            body += chunk;
        });
        response.on('end', function () {
            console.log( body);
        });
    });

    request.on('error', function (err) {
        console.log(err);
    });

}

module.exports = icecat;