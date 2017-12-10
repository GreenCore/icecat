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
    const _this = this;

    return new Promise(
        function (resolve, reject) {
            const argGTIN = 'ean_upc=' + GTIN;
            const argLANG = ';lang=' + lang;
            const argOutput = ';output=productxml';

            const httpRequestUrl =
                _this.icecat.scheme +
                _this.icecat.httpAuth + '@' +
                _this.icecat.httpUrl + '?' +
                argGTIN +
                argLANG +
                argOutput;

            let request = https.get(httpRequestUrl, function (response) {
                let body = '';
                response.on('data', function (chunk) {
                    body += chunk;
                });
                response.on('end', function () {
                    parseString(body, function (err, jsonData) {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(new icecatProduct(jsonData, body, httpRequestUrl));
                    });
                });
            });

            request.on('error', function (err) {
                return reject(err);
            });

        });
}

module.exports = openCatalog;
