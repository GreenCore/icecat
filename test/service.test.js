'use strict';

const fs = require('fs');
const path = require('path');
const PassThrough = require('stream').PassThrough;
const sinon = require('sinon');
const test = require('ava');

const IcecatService = require('../lib/OpenCatalog/service');
const IcecatProduct = require('../lib/OpenCatalog/product');

const icecatProductXML = fs.readFileSync(path.join(__dirname, 'fixtures/4948570114344.xml'), 'utf8');

const instance = {
  scheme: 'https',
  httpAuth: 'username:password',
  httpUrl: 'https://example.com',
  lang: 'EN'
};

let sandbox;
test.beforeEach(() => {
  sandbox = sinon.createSandbox();
});

test.afterEach(() => {
  sandbox.restore();
});

test('_getBaseUrl returns correct base URL', (t) => {
  const service = new IcecatService(instance);
  const expectedUrl = `${instance.scheme}${instance.httpAuth}@${instance.httpUrl}?lang=${instance.lang};output=productxml`;
  t.is(service._getBaseUrl(instance.lang), expectedUrl);
});

test.serial('getProduct calls correct url', (t) => {
  const service = new IcecatService(instance);
  sandbox.stub(service, '_requestProduct');

  const lang = 'EN';
  const barcode = '123';
  service.getProduct(lang, barcode);

  const expectedUrl = service._getBaseUrl(lang) + `;ean_upc=${barcode}`;

  t.truthy(service._requestProduct.calledWith(expectedUrl));
});

test.serial('getProductById calls correct url', (t) => {
  const service = new IcecatService(instance);
  sandbox.stub(service, '_requestProduct');

  const lang = 'EN';
  const productId = '123';
  service.getProductById(lang, productId);

  const expectedUrl = service._getBaseUrl(lang) + `;product_id=${productId}`;
  const callArg = service._requestProduct.getCall(0).args[0];

  t.is(callArg, expectedUrl);
});

test.serial('getProductBySKU calls correct url', (t) => {
  const service = new IcecatService(instance);
  sandbox.stub(service, '_requestProduct');

  const lang = 'EN';
  const brand = 'hp';
  const sku = 'RJ459AV';
  service.getProductBySKU(lang, brand, sku);

  const expectedUrl = service._getBaseUrl(lang) + ';prod_id=' + sku + ';vendor=' + brand;
  const callArg = service._requestProduct.getCall(0).args[0];

  t.is(callArg, expectedUrl);
});

test.serial.cb('getProductByXMLdata can return IcecatProduct', (t) => {
  const service = new IcecatService();
  const promise = service.getProductByXMLdata(icecatProductXML);

  promise.then((icecatProduct) => {
    t.truthy(icecatProduct instanceof IcecatProduct);
    t.end();
  });
});

test('Sets icecat to empty object if initialised with nothing', (t) => {
  const service = new IcecatService();
  t.deepEqual(service.icecat, {});
});

function isPromise(x) {
  return x && x instanceof Promise;
}

test.serial('_requestProduct returns Promise', (t) => {
  const service = new IcecatService(instance);
  sandbox.stub(service.https, 'get').returns({
    on: () => {}
  });

  t.truthy(isPromise(service._requestProduct()));
});

test.serial.cb('_requestProduct can return IcecatProduct', (t) => {
  const service = new IcecatService(instance);
  const requestStream = new PassThrough();
  sandbox.stub(service.https, 'get').returns(requestStream);
  const responseStream = new PassThrough();
  responseStream.write(icecatProductXML);
  responseStream.end();
  const promise = service._requestProduct('');
  service.https.get.yield(responseStream);
  promise.then((icecatProduct) => {
    t.truthy(icecatProduct instanceof IcecatProduct);
    t.end();
  });
});

test.serial.cb('_requestProduct can return error if unable to parse XML', (t) => {
  const service = new IcecatService(instance);
  const requestStream = new PassThrough();
  sandbox.stub(service.https, 'get').returns(requestStream);
  sandbox.spy(service, 'parseString');
  const responseStream = new PassThrough();
  responseStream.write('<wtfis></thisxml>');
  responseStream.end();
  const promise = service._requestProduct('');
  service.https.get.yield(responseStream);
  promise.catch(() => {
    t.truthy(service.parseString.calledOnce);
    t.end();
  });
});

test.serial.cb('_requestProduct resolves error if http call fails', (t) => {
  const service = new IcecatService(instance);
  const requestStream = new PassThrough();
  sandbox.stub(service.https, 'get').returns(requestStream);

  const promise = service._requestProduct('');
  const errObj = new Error('OOPS');
  requestStream.emit('error', errObj);
  promise.catch((error) => {
    t.is(error, errObj);
    t.end();
  });
});
