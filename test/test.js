'use strict';

const assert = require('assert');

const https = require('https');
const parseString = require('xml2js').parseString;
const fs = require('fs');

const icecatProduct = require('../lib/OpenCatalog/product');


describe('IcecatProduct', function () {
    let icecatProductXML = fs.readFileSync(__dirname + '/fixtures/4948570114344.xml', 'utf8');
    let icecatProductJSON;
    let testProduct;

    describe('Create Product', function () {
        it('should parse XML to JSON', function () {
            parseString(icecatProductXML, function (err, jsonData) {
                icecatProductJSON = jsonData;
                assert.ok(typeof icecatProductJSON === 'object');
            });
        });

        it('should return IcecatProduct', function () {
            testProduct = new icecatProduct(icecatProductJSON, icecatProductXML);
            assert.ok(testProduct instanceof icecatProduct);
        });
    });

    describe('Get Product values', function () {
        it('should get Product Name', function () {
            assert.equal(
                testProduct.getName(),
                'X4071UHSU-B1'
            );
        });

        it('should get Product Url', function () {
            assert.equal(
                testProduct.getProductUrl(),
                'http://www.iiyama.com/gl_en/products/prolite-x4071uhsu-b1/'
            );
        });

        it('should get Product EAN', function () {
            assert.equal(
                testProduct.getEan(),
                '4948570114344'
            );
        });

    });

});