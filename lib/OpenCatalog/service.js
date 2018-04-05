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
openCatalog.prototype.getProduct = function (lang, GTIN) {
    const httpRequestUrl = this._getBaseUrl(lang) + ';ean_upc=' + GTIN;

    return this._requestProduct(httpRequestUrl);
};

/**
 * getProductById
 *
 * @param {string} lang
 * @param {integer} productId
 */
openCatalog.prototype.getProductById = function (lang, productId) {
    const httpRequestUrl = this._getBaseUrl(lang) + ';product_id=' + productId;

    return this._requestProduct(httpRequestUrl);
};

/**
 * Create base url.
 *
 * @param {string} lang
 */
openCatalog.prototype._getBaseUrl = function (lang) {
    const {scheme, httpAuth, httpUrl} = this.icecat;
    return `${scheme}${httpAuth}@${httpUrl}?lang=${lang};output=productxml`;
};

/**
 * Fetch the product by the http request url.
 *
 * @param httpRequestUrl
 * @returns {Promise}
 */
openCatalog.prototype._requestProduct = function (httpRequestUrl) {
    return new Promise(
        function (resolve, reject) {
            let request = https.get(httpRequestUrl, function (response) {
                let body = '';

                response.on('data', function (chunk) {
                    body += chunk;
                });

                response.on('end', function () {
                    parseString(body, function (err, jsonData) {
                        if (err) {
                            reject(err);
                        }

                        resolve(new icecatProduct(jsonData, body, httpRequestUrl));
                    });
                });
            });

            request.on('error', function (err) {
                reject(err);
            });

        });
};

module.exports = openCatalog;