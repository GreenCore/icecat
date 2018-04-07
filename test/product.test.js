'use strict';

const test = require('tape');
const path = require('path');
const fs = require('fs');

const icecatProduct = require('../lib/OpenCatalog/product');

const icecatProductJSONFound = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/4948570114344.json'), 'utf8'));
const icecatProductXMLFound = fs.readFileSync(path.join(__dirname, 'fixtures/4948570114344.xml'), 'utf8');
const icecatProductJSONNotFound = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/12345.json'), 'utf8'));
const icecatProductXMLNotFound = fs.readFileSync(path.join(__dirname, 'fixtures/12345.xml'), 'utf8');
const requestUrl = 'https://user:password@data.icecat.biz/response';

test('Found - Create Product', (t) => {
  const testProduct = new icecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  t.ok(testProduct instanceof icecatProduct);
  t.equal(testProduct.requestUrl, requestUrl);
  t.end();
});

test('Found - Return code Success', (t) => {
  const testProduct = new icecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  t.is(testProduct.getReturnCode(), testProduct.returnCode.SUCCESS);
  t.end();
});

test('Found - Product values - Name', (t) => {
  const testProduct = new icecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  t.is(testProduct.getName(), 'X4071UHSU-B1');
  t.end();
});

test('Found - Product values - Url', (t) => {
  const testProduct = new icecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  t.is(testProduct.getProductUrl(), 'http://www.iiyama.com/gl_en/products/prolite-x4071uhsu-b1/');
  t.end();
});

test('Found - Product values - EAN', (t) => {
  const testProduct = new icecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  t.is(testProduct.getEan(), '4948570114344');
  t.end();
});

test('Found - Product values - ID', (t) => {
  const testProduct = new icecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  t.is(testProduct.getProductUrl(), 'http://www.iiyama.com/gl_en/products/prolite-x4071uhsu-b1/');
  t.end();
});

test('Found - Product values - Error message', (t) => {
  const testProduct = new icecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  t.notOk(testProduct.getErrorMessage(), 'No errors when succeeding');
  t.end();
});

test('Found - Product values - Multimedia Objects', (t) => {
  const testProduct = new icecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  t.deepEqual(testProduct.getMultimediaObjects(), [
    {
      contentType: 'image/png',
      description: 'EU Energy Label',
      thumbPic: undefined,
      keepAsURL: '0',
      size: '26873',
      url: 'http://objects.icecat.biz/objects/mmo_29900045_1466759173_0229_548.png'
    }
  ]);
  t.end();
});

test('Found - Product values - Specifications', (t) => {
  const testProduct = new icecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  t.deepEqual(testProduct.getSpecifications(), [
    {
      name: 'Display diagonal',
      presentationValue: '100.3 cm (39.5")',
      value: '39.5',
      specId: '87016',
      specGroupId: '10074'
    },
    { name: 'Display type', presentationValue: 'LED', value: 'LED', specId: '87015', specGroupId: '10074' },
    {
      name: 'Display resolution',
      presentationValue: '3840 x 2160 pixels',
      value: '3840 x 2160',
      specId: '87018',
      specGroupId: '10074'
    },
    { name: 'Display brightness', presentationValue: '350 cd/m²', value: '350', specId: '87020', specGroupId: '10074' },
    { name: 'HD type', presentationValue: '4K Ultra HD', value: '4K Ultra HD', specId: '87084', specGroupId: '10074' },
    { name: 'Response time', presentationValue: '3 ms', value: '3', specId: '87085', specGroupId: '10074' },
    {
      name: 'Contrast ratio (typical)',
      presentationValue: '5000:1',
      value: '5000:1',
      specId: '87026',
      specGroupId: '10074'
    },
    {
      name: 'Contrast ratio (dynamic)',
      presentationValue: '12000000:1',
      value: '12000000:1',
      specId: '87027',
      specGroupId: '10074'
    },
    {
      name: 'Viewing angle, horizontal',
      presentationValue: '178°',
      value: '178',
      specId: '87028',
      specGroupId: '10074'
    },
    { name: 'Viewing angle, vertical', presentationValue: '178°', value: '178', specId: '87029', specGroupId: '10074' },
    {
      name: 'Display number of colours',
      presentationValue: '1.073 billion colours',
      value: '1.073 billion colours',
      specId: '154124',
      specGroupId: '10074'
    },
    {
      name: 'Pixel pitch',
      presentationValue: '0.229 x 0.225 mm',
      value: '0.229 x 0.225',
      specId: '87031',
      specGroupId: '10074'
    },
    {
      name: 'Active display area (W x H)',
      presentationValue: '485.35 x 878.11 mm',
      value: '485.35 x 878.11',
      specId: '91968',
      specGroupId: '10074'
    },
    {
      name: 'Display diagonal (metric)',
      presentationValue: '100.3 cm',
      value: '100.3',
      specId: '87017',
      specGroupId: '10074'
    },
    {
      name: 'Horizontal scan range',
      presentationValue: '30 - 135 kHz',
      value: '30 - 135',
      specId: '87080',
      specGroupId: '10074'
    },
    {
      name: 'Vertical scan range',
      presentationValue: '24 - 75 Hz',
      value: '24 - 75',
      specId: '87081',
      specGroupId: '10074'
    },
    {
      name: 'Supported graphics resolutions',
      presentationValue: '1920 x 1080 (HD 1080), 2048 x 1152, 2560 x 1440, 3840 x 2160',
      value: '1920 x 1080 (HD 1080),2048 x 1152,2560 x 1440,3840 x 2160',
      specId: '87119',
      specGroupId: '10074'
    },
    { name: 'Native aspect ratio', presentationValue: '16:9', value: '16:9', specId: '87127', specGroupId: '10074' },
    { name: 'Touchscreen', presentationValue: 'N', value: 'N', specId: '92129', specGroupId: '10074' },
    { name: 'Ethernet LAN', presentationValue: 'N', value: 'N', specId: '87024', specGroupId: '10083' },
    { name: 'HDMI ports quantity', presentationValue: '3', value: '3', specId: '87083', specGroupId: '10083' },
    { name: 'DVI port', presentationValue: 'N', value: 'N', specId: '87066', specGroupId: '10083' },
    { name: 'VGA (D-Sub) input ports', presentationValue: '1', value: '1', specId: '87065', specGroupId: '10083' },
    { name: 'HDMI in', presentationValue: '3', value: '3', specId: '94285', specGroupId: '10083' },
    { name: 'USB port', presentationValue: 'Y', value: 'Y', specId: '87100', specGroupId: '10083' },
    {
      name: 'USB version',
      presentationValue: '3.0 (3.1 Gen 1)',
      value: '3.0 (3.1 Gen 1)',
      specId: '87129',
      specGroupId: '10083'
    },
    { name: 'USB ports quantity', presentationValue: '3', value: '3', specId: '87130', specGroupId: '10083' },
    { name: 'DisplayPorts quantity', presentationValue: '1', value: '1', specId: '87329', specGroupId: '10083' },
    { name: 'TV tuner integrated', presentationValue: 'N', value: 'N', specId: '87057', specGroupId: '10870' },
    { name: 'Picture-in-Picture', presentationValue: 'Y', value: 'Y', specId: '87021', specGroupId: '10870' },
    { name: 'HDCP', presentationValue: 'Y', value: 'Y', specId: '87063', specGroupId: '10870' },
    { name: 'Number of OSD languages', presentationValue: '10', value: '10', specId: '87133', specGroupId: '10870' },
    {
      name: 'On Screen Display (OSD) languages',
      presentationValue: 'CHI (SIMPL), CHI (TR), CZE, German, Dutch, English, French, Italian, JPN, POL, Romanian',
      value: 'CHI (SIMPL),CHI (TR),CZE,DEU,DUT,ENG,FRE,ITA,JPN,POL,RUM',
      specId: '87134',
      specGroupId: '10870'
    },
    { name: 'Plug and Play', presentationValue: 'Y', value: 'Y', specId: '87092', specGroupId: '10870' },
    { name: 'Colour of product', presentationValue: 'Black', value: 'Black', specId: '87019', specGroupId: '10869' },
    { name: 'VESA mounting', presentationValue: 'Y', value: 'Y', specId: '102550', specGroupId: '10869' },
    {
      name: 'VESA mounting interfaces',
      presentationValue: '400 x 200 mm',
      value: '400 x 200',
      specId: '87047',
      specGroupId: '10869'
    },
    {
      name: 'Placement supported',
      presentationValue: 'Vertical',
      value: 'Vertical',
      specId: '87128',
      specGroupId: '10869'
    },
    {
      name: 'Certification',
      presentationValue: 'CE, TÜV-Bauart, VCCI-B, CU, PSE',
      value: 'CE, TÜV-Bauart, VCCI-B, CU, PSE',
      specId: '87023',
      specGroupId: '10869'
    },
    { name: 'Built-in speaker(s)', presentationValue: 'Y', value: 'Y', specId: '87049', specGroupId: '10080' },
    { name: 'RMS rated power', presentationValue: '12 W', value: '12', specId: '87051', specGroupId: '10080' },
    {
      name: 'Power consumption (typical)',
      presentationValue: '60 W',
      value: '60',
      specId: '87053',
      specGroupId: '10081'
    },
    {
      name: 'Power consumption (standby)',
      presentationValue: '0.5 W',
      value: '0.5',
      specId: '87054',
      specGroupId: '10081'
    },
    {
      name: 'AC input voltage',
      presentationValue: '100 - 240 V',
      value: '100 - 240',
      specId: '87055',
      specGroupId: '10081'
    },
    {
      name: 'AC input frequency',
      presentationValue: '50/60 Hz',
      value: '50/60',
      specId: '87056',
      specGroupId: '10081'
    },
    { name: 'Energy efficiency class', presentationValue: 'B', value: 'B', specId: '87360', specGroupId: '10081' },
    { name: 'Energy Star certified', presentationValue: 'N', value: 'N', specId: '87093', specGroupId: '10081' },
    { name: 'Computer system', presentationValue: 'N', value: 'N', specId: '150573', specGroupId: '16263' },
    { name: 'Width', presentationValue: '906.5 mm', value: '906.5', specId: '87011', specGroupId: '10073' },
    { name: 'Depth', presentationValue: '238.5 mm', value: '238.5', specId: '87012', specGroupId: '10073' },
    { name: 'Height', presentationValue: '577 mm', value: '577', specId: '87013', specGroupId: '10073' },
    { name: 'Weight', presentationValue: '12.2 kg', value: '12200', specId: '87014', specGroupId: '10073' },
    { name: 'Handheld remote control', presentationValue: 'Y', value: 'Y', specId: '87041', specGroupId: '10078' },
    {
      name: 'Cables included',
      presentationValue: 'AC, Audio (3.5mm), DisplayPort, HDMI, Mini DisplayPort, RS-232, USB',
      value: 'AC,Audio (3.5mm),DisplayPort,HDMI,Mini DisplayPort,RS-232,USB',
      specId: '87042',
      specGroupId: '10078'
    },
    { name: 'Mounting kit', presentationValue: 'Y', value: 'Y', specId: '87045', specGroupId: '10078' },
    { name: 'Quick start guide', presentationValue: 'Y', value: 'Y', specId: '87230', specGroupId: '10078' },
    { name: '3D', presentationValue: 'N', value: 'N', specId: '87266', specGroupId: '10101' },
    { name: 'AC (power) in', presentationValue: 'Y', value: 'Y', specId: '87267', specGroupId: '10101' },
    { name: 'Aspect ratio', presentationValue: '16:9', value: '16:9', specId: '87271', specGroupId: '10101' },
    { name: 'Built-in camera', presentationValue: 'N', value: 'N', specId: '87307', specGroupId: '10101' },
    {
      name: 'Cable lock slot',
      presentationValue: 'Kensington',
      value: 'Kensington',
      specId: '87311',
      specGroupId: '10101'
    },
    { name: 'Display', presentationValue: 'LED', value: 'LED', specId: '87325', specGroupId: '10101' },
    { name: 'Display technology', presentationValue: 'MVA', value: 'MVA', specId: '87328', specGroupId: '10101' },
    { name: 'EPEAT compliance', presentationValue: 'Silver', value: 'Silver', specId: '87361', specGroupId: '10101' },
    {
      name: 'Headphone connectivity',
      presentationValue: '3.5 mm',
      value: '3.5 mm',
      specId: '87367',
      specGroupId: '10101'
    },
    { name: 'Headphone outputs', presentationValue: '1', value: '1', specId: '87368', specGroupId: '10101' },
    { name: 'Number of loudspeakers', presentationValue: '2', value: '2', specId: '87391', specGroupId: '10101' },
    { name: 'On/off switch', presentationValue: 'Y', value: 'Y', specId: '87392', specGroupId: '10101' },
    { name: 'Separate H/V sync', presentationValue: 'Y', value: 'Y', specId: '87423', specGroupId: '10101' },
    {
      name: 'USB 3.0 (3.1 Gen 1) ports quantity',
      presentationValue: '3',
      value: '3',
      specId: '87438',
      specGroupId: '10101'
    },
    {
      name: 'Viewable size, horizontal',
      presentationValue: '48.5 cm',
      value: '485.35',
      specId: '87441',
      specGroupId: '10101'
    },
    {
      name: 'Viewable size, vertical',
      presentationValue: '87.8 cm',
      value: '878.11',
      specId: '87442',
      specGroupId: '10101'
    }
  ]);
  t.end();
});

test('Not found - Create Product', (t) => {
  const testProduct = new icecatProduct(icecatProductJSONNotFound, icecatProductXMLNotFound, requestUrl);
  t.ok(testProduct instanceof icecatProduct);
  t.equal(testProduct.requestUrl, requestUrl);
  t.end();
});

test('Not found - Return code Fail', (t) => {
  const testProduct = new icecatProduct(icecatProductJSONNotFound, icecatProductXMLNotFound, requestUrl);
  t.is(testProduct.getReturnCode(), testProduct.returnCode.FAIL);
  t.end();
});
