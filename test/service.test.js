'use strict';

const fs = require('fs');
const path = require('path');
const { PassThrough } = require('stream');
const sinon = require('sinon');
const test = require('tape');

const IcecatService = require('../lib/OpenCatalog/service');
const IcecatProduct = require('../lib/OpenCatalog/product');

const icecatProductJSON = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/4948570114344.json'), 'utf8'));
const icecatProductXML = fs.readFileSync(path.join(__dirname, 'fixtures/4948570114344.xml'), 'utf8');

const instance = {
  scheme: 'https',
  httpAuth: 'username:password',
  httpUrl: 'https://example.com',
  lang: 'EN'
};

test('_getBaseUrl returns correct base URL', (t) => {
  const service = new IcecatService(instance);
  const expectedUrl = `${instance.scheme}${instance.httpAuth}@${instance.httpUrl}?lang=${
    instance.lang
  };output=productxml`;
  t.is(service._getBaseUrl(instance.lang), expectedUrl);
  t.end();
});

test('getProduct calls correct url', (t) => {
  const sandbox = sinon.sandbox.create();
  const service = new IcecatService(instance);
  sandbox.stub(service, '_requestProduct');

  const lang = 'EN';
  const barcode = '123';
  service.getProduct(lang, barcode);

  const expectedUrl = service._getBaseUrl(lang) + `;ean_upc=${barcode}`;

  t.ok(service._requestProduct.calledWith(expectedUrl));
  sandbox.restore();
  t.end();
});

test('getProductById calls correct url', (t) => {
  const sandbox = sinon.sandbox.create();
  const service = new IcecatService(instance);
  sandbox.stub(service, '_requestProduct');

  const lang = 'EN';
  const productId = '123';
  service.getProductById(lang, productId);

  const expectedUrl = service._getBaseUrl(lang) + `;product_id=${productId}`;
  const [callArg] = service._requestProduct.getCall(0).args;

  t.is(callArg, expectedUrl);
  sandbox.restore();
  t.end();
});

test('Sets icecat to empty object if initialised with nothing', (t) => {
  const service = new IcecatService();
  t.deepEqual(service.icecat, {});
  t.end();
});

function isPromise(x) {
  return x && Object.prototype.toString.call(x) === '[object Promise]';
}

test('_requestProduct returns Promise', (t) => {
  const sandbox = sinon.sandbox.create();
  const service = new IcecatService(instance);
  sandbox.stub(service.https, 'get').returns({
    on: () => {}
  });

  t.ok(isPromise(service._requestProduct()));
  sandbox.restore();
  t.end();
});

test('_requestProduct can return IcecatProduct', (t) => {
  const sandbox = sinon.sandbox.create();
  const service = new IcecatService(instance);
  const requestStream = new PassThrough();
  sandbox.stub(service.https, 'get').returns(requestStream);
  const responseStream = new PassThrough();
  responseStream.write(icecatProductXML);
  responseStream.end();
  const promise = service._requestProduct('');
  service.https.get.yield(responseStream);
  promise.then((icecatProduct) => {
    t.ok(icecatProduct instanceof IcecatProduct);
    sandbox.restore();
    t.end();
  });
});

test('_requestProduct can return error if unable to parse XML', (t) => {
  const sandbox = sinon.sandbox.create();
  const service = new IcecatService(instance);
  const requestStream = new PassThrough();
  sandbox.stub(service.https, 'get').returns(requestStream);
  sandbox.spy(service.parseString);
  const responseStream = new PassThrough();
  responseStream.write('<wtfis></thisxml>');
  responseStream.end();
  const promise = service._requestProduct('');
  service.https.get.yield(responseStream);
  promise.catch((err) => {
    t.is(service.parseString.calledOnce);
    sandbox.restore();
    t.end();
  });
});

test('_requestProduct resolves error if http call fails', (t) => {
  const sandbox = sinon.sandbox.create();
  const service = new IcecatService(instance);
  const requestStream = new PassThrough();
  sandbox.stub(service.https, 'get').returns(requestStream);

  const promise = service._requestProduct('');
  const errObj = new Error('OOPS');
  requestStream.emit('error', errObj);
  promise.catch((err) => {
    t.is(err, errObj);
    sandbox.restore();
    t.end();
  });
});
