'use strict';

const https = require('https');
const {parseString} = require('xml2js');
const icecatProduct = require('./product');

/**
 *
 * @param instance
 */
const openCatalog = function (instance) {
    this.icecat = instance || {};
};

/**
 * getProduct
 * @param lang
 * @param GTIN
 * @returns {Promise}
 */
openCatalog.prototype.getProduct = function(lang, GTIN) {
    const httpRequestUrl = this._getBaseUrl(lang) + ';ean_upc=' + GTIN;

    return this._requestProduct(httpRequestUrl);
};

/**
 * Get product by it's id.
 *
 * @param {string} lang
 * @param {integer} productId
 */
openCatalog.prototype.getProductById = function(lang, productId) {
    const httpRequestUrl = this._getBaseUrl(lang) + ';product_id=' + productId;

    return this._requestProduct(httpRequestUrl);
};

/**
 * Create base url.
 *
 * @param {string} lang
 */
openCatalog.prototype._getBaseUrl = function(lang) {
    const argLANG = 'lang=' + lang;
    const argOutput = ';output=productxml';
    const httpRequestUrl =
        this.icecat.scheme +
        this.icecat.httpAuth + '@' +
        this.icecat.httpUrl + '?' +
        argLANG +
        argOutput;

    return httpRequestUrl;
};

/**
 * Fetch the product by the http request url.
 *
 * @param httpRequestUrl
 * @returns {Promise}
 */
openCatalog.prototype._requestProduct = function(httpRequestUrl) {
    return new Promise(
        function(resolve, reject) {
            let request = https.get(httpRequestUrl, function(response) {

                let body = '';

                response.on('data', function(chunk) {
                    body += chunk;
                });

                response.on('end', function() {
                    parseString(body, function(err, jsonData) {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(new icecatProduct(jsonData, body, httpRequestUrl));
                    });
                });
            });

            request.on('error', function (err) {
                reject(err);
            });

        });
};

module.exports = openCatalog;