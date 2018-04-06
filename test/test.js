'use strict';

const assert = require('assert');
const path = require('path');
const {parseString} = require('xml2js');
const fs = require('fs');

const icecatProduct = require('../lib/OpenCatalog/product');


describe('IcecatProduct - Found', function () {
    let icecatProductXML = fs.readFileSync(path.join(__dirname, 'fixtures/4948570114344.xml'), 'utf8');
    let icecatProductJSON = null;
    let testProduct = null;

    describe('Create Product', function () {
        it('should return IcecatProduct', function () {
            parseString(icecatProductXML, function (err, jsonData) {
                icecatProductJSON = jsonData;
            });

            const requestUrl = 'https://user:password@data.icecat.biz/response';
            testProduct = new icecatProduct(icecatProductJSON, icecatProductXML, requestUrl);
            assert.ok(testProduct instanceof icecatProduct);
            assert.ok(testProduct.requestUrl === requestUrl);
        });
    });

    describe('Get Product values', function () {
        it('should get Product returnCode Success', function () {
            assert.strictEqual(
                testProduct.getReturnCode(),
                testProduct.returnCode.SUCCESS
            );
        });

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

        it('should get Icecat Product Id', function () {
            assert.equal(
                testProduct.getID(),
                '29900045'
            );
        });
    });
});

describe('IcecatProduct - Not Found', function () {
    let icecatProductXML = fs.readFileSync(path.join(__dirname, 'fixtures/12345.xml'), 'utf8');
    let icecatProductJSON = null;
    let testProduct = null;

    describe('Create Product', function () {
        it('should return IcecatProduct', function () {
            parseString(icecatProductXML, function (err, jsonData) {
                icecatProductJSON = jsonData;
            });

            const requestUrl = 'https://user:password@data.icecat.biz/response';
            testProduct = new icecatProduct(icecatProductJSON, icecatProductXML, requestUrl);
            assert.ok(testProduct instanceof icecatProduct);
            assert.ok(testProduct.requestUrl === requestUrl);
        });
    });

    describe('Get Product values', function () {
        it('should get Product returnCode Fail', function () {
            assert.strictEqual(
                testProduct.getReturnCode(),
                testProduct.returnCode.FAIL
            );
        });
    });
});