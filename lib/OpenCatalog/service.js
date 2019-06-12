'use strict';

const https = require('https');
const parseString = require('xml2js').parseString;
const IcecatProduct = require('./product');

/**
 *
 * @param instance
 */
const openCatalog = function(instance) {
  this.icecat = instance || {};
  this.https = https;
  this.parseString = parseString;
};

/**
 * GetProduct
 * @param lang
 * @param GTIN
 * @returns {Promise}
 */
openCatalog.prototype.getProduct = function(lang, GTIN) {
  const httpRequestUrl = this._getBaseUrl(lang) + ';ean_upc=' + GTIN;

  return this._requestProduct(httpRequestUrl);
};

/**
 * GetProductById
 *
 * @param {string} lang
 * @param {integer} productId
 */
openCatalog.prototype.getProductById = function(lang, productId) {
  const httpRequestUrl = this._getBaseUrl(lang) + ';product_id=' + productId;

  return this._requestProduct(httpRequestUrl);
};

/**
 * getProductBySKU
 *
 * Fetch product information by vendor + sku
 *
 * @param {string} lang
 * @param {string} brand
 * @param {string} sku
 */
openCatalog.prototype.getProductBySKU = function(lang, brand, sku) {
  const httpRequestUrl = this._getBaseUrl(lang) + ';prod_id=' + sku + ';vendor=' + brand;

  return this._requestProduct(httpRequestUrl);
};

/**
 * getProductByXMLdata
 *
 * Fetch product information by XML data
 *
 * @param {string} xmlData
 */
openCatalog.prototype.getProductByXMLdata = function(xmlData) {
  return this._getProductByXMLdata(xmlData);
};

/**
 * _getProductByXMLdata
 *
 * Fetch product information by XML data
 *
 * @param {string} xmlData
 * @param {string} httpRequestUrl
 */
openCatalog.prototype._getProductByXMLdata = function(xmlData, httpRequestUrl) {
  return new Promise((resolve, reject) => {
    this.parseString(xmlData, (err, jsonData) => {
      if (err) {
        return reject(err);
      }

      return resolve(new IcecatProduct(jsonData, xmlData, httpRequestUrl));
    });
  });
};

/**
 * Create base url.
 *
 * @param {string} lang
 */
openCatalog.prototype._getBaseUrl = function(lang) {
  return `${this.icecat.scheme}${this.icecat.httpAuth}@${this.icecat.httpUrl}?lang=${lang};output=productxml`;
};

/**
 * Fetch the product by the http request url.
 *
 * @param httpRequestUrl
 * @returns {Promise}
 */
openCatalog.prototype._requestProduct = function(httpRequestUrl) {
  return new Promise((resolve, reject) => {
    const request = this.https.get(httpRequestUrl, (response) => {
      let body = '';

      response.on('data', (chunk) => {
        body += chunk;
      });

      response.on('end', () => {
        return resolve(this._getProductByXMLdata(body, httpRequestUrl));
      });
    });

    request.on('error', (err) => {
      reject(err);
    });
  });
};

module.exports = openCatalog;
