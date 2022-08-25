'use strict';

const fs = require('fs');
const path = require('path');
const PassThrough = require('stream').PassThrough;
const IcecatService = require('../lib/OpenCatalog/service');
const IcecatProduct = require('../lib/OpenCatalog/product');

const icecatProductXML = fs.readFileSync(path.join(__dirname, 'fixtures/4948570114344.xml'), 'utf8');

const instance = {
  scheme: 'https',
  httpAuth: 'username:password',
  httpUrl: 'https://example.com',
  lang: 'EN'
};

let service;
let mockRequestProduct;
beforeEach(() => {
  jest.restoreAllMocks();
  service = new IcecatService(instance);
  mockRequestProduct = jest.spyOn(service, '_requestProduct').mockResolvedValue({});
});

test('_getBaseUrl returns correct base URL', () => {
  const service = new IcecatService(instance);
  const expectedUrl = `${instance.scheme}${instance.httpAuth}@${instance.httpUrl}?lang=${instance.lang};output=productxml`;
  expect(service._getBaseUrl(instance.lang)).toBe(expectedUrl);
});

test('getProduct calls correct url', () => {
  const lang = 'EN';
  const barcode = '123';
  service.getProduct(lang, barcode);

  const expectedUrl = service._getBaseUrl(lang) + `;ean_upc=${barcode}`;

  expect(service._requestProduct).toBeCalledWith(expectedUrl);
});

test('getProductById calls correct url', () => {
  const lang = 'EN';
  const productId = '123';
  service.getProductById(lang, productId);

  const expectedUrl = service._getBaseUrl(lang) + `;product_id=${productId}`;

  expect(mockRequestProduct).toBeCalledWith(expectedUrl);
});

test('getProductBySKU calls correct url', () => {
  const lang = 'EN';
  const brand = 'hp';
  const sku = 'RJ459AV';
  service.getProductBySKU(lang, brand, sku);

  const expectedUrl = service._getBaseUrl(lang) + ';prod_id=' + sku + ';vendor=' + brand;

  expect(mockRequestProduct).toBeCalledWith(expectedUrl);
});

test('getProductByXMLdata can return IcecatProduct', async () => {
  const service = new IcecatService();

  const icecatProduct = await service.getProductByXMLdata(icecatProductXML);
  expect(icecatProduct instanceof IcecatProduct).toBeTruthy();
});

test('Sets icecat to empty object if initialised with nothing', () => {
  const service = new IcecatService();
  expect(service.icecat).toEqual({});
});

test('_requestProduct can return IcecatProduct', async () => {
  const service = new IcecatService(instance);

  const responseStream = PassThrough();
  service.https.get = jest.fn().mockImplementation((_url, cb) => {
    cb(responseStream);

    responseStream.emit('data', icecatProductXML);

    responseStream.emit('end');
  });

  const icecatProduct = await service._requestProduct('');
  expect(icecatProduct).toBeInstanceOf(IcecatProduct);
});

test('_requestProduct can return error if unable to parse XML', async () => {
  const service = new IcecatService(instance);
  jest.spyOn(service, 'parseString');

  const responseStream = PassThrough();
  service.https.get = jest.fn().mockImplementation((_url, cb) => {
    cb(responseStream);

    responseStream.emit('data', '<wtfis></thisxml>');

    responseStream.emit('end');
  });

  expect(service._requestProduct('')).rejects.toThrow();
  expect(service.parseString).toBeCalledTimes(1);
});

test('_requestProduct resolves error if http call fails', async () => {
  const service = new IcecatService(instance);
  const expectedError = 'OOPS';

  const responseStream = PassThrough();
  service.https.get = jest.fn().mockImplementation((_url, cb) => {
    cb(responseStream);

    responseStream.emit('error', expectedError);

    return responseStream;
  });

  expect(service._requestProduct('')).rejects.toMatch(expectedError);
});
