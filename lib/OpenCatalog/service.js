'use strict';

const https = require('https');
const parseString = require('xml2js').parseString;
const icecatProduct = require('./product');

/**
 *
 * @param instance
 */
const openCatalog = function (instance) {
    this.icecat = instance || {};
}

/**
 * getProduct
 * @param lang
 * @param GTIN
 * @returns {Promise}
 */
openCatalog.prototype.getProduct = function (lang, GTIN) {
    const httpAuth = this.icecat.httpAuth
    return new Promise(
        function (resolve, reject) {
            var version = 1;
            var mode = 'read';

            var httpUrl = 'data.icecat.biz/xml_s3/xml_server3.cgi';

            var argGTIN = 'ean_upc=' + GTIN;
            var argOutput = ';lang=' + lang + ';output=productxml';

            var httpRequestUrl = 'https://' +
                httpAuth + '@' +
                httpUrl + '?' +
                argGTIN +
                argOutput;

            var request = https.get(httpRequestUrl, function (response) {
                var body = '';
                response.on('data', function (chunk) {
                    body += chunk;
                });
                response.on('end', function () {
                    parseString(body, function (err, result) {
                        resolve(new icecatProduct(result));
                    });
                });
            });

            request.on('error', function (err) {
                reject(err);
            });

        });
}

module.exports = openCatalog;