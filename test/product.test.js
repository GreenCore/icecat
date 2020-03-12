'use strict';

const path = require('path');
const fs = require('fs');
const test = require('ava');

const IcecatProduct = require('../lib/OpenCatalog/product');

const icecatProductJSONFound = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/4948570114344.json'), 'utf8'));
const icecatProductXMLFound = fs.readFileSync(path.join(__dirname, 'fixtures/4948570114344.xml'), 'utf8');
const icecatProductJSONNotFound = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/12345.json'), 'utf8'));
const icecatProductXMLNotFound = fs.readFileSync(path.join(__dirname, 'fixtures/12345.xml'), 'utf8');
const requestUrl = 'https://user:password@data.icecat.biz/response';

test('Found - Create Product', (t) => {
  const testProduct = new IcecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  t.truthy(testProduct instanceof IcecatProduct);
  t.is(testProduct.requestUrl, requestUrl);
});

test('Found - Return code Success', (t) => {
  const testProduct = new IcecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  t.is(testProduct.getReturnCode(), testProduct.returnCode.SUCCESS);
});

test('Found - Get JSON data', (t) => {
  const testProduct = new IcecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  t.is(testProduct.getJSON(), icecatProductJSONFound);
});

test('Found - Get XML data', (t) => {
  const testProduct = new IcecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  t.is(testProduct.getXML(), icecatProductXMLFound);
});

test('Found - Product values - ID', (t) => {
  const testProduct = new IcecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  t.is(testProduct.getID(), '29900045');
});

test('Found - Product values - Title', (t) => {
  const testProduct = new IcecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  t.is(testProduct.getTitle(), 'iiyama X4071UHSU-B1 39.5" LED 4K Ultra HD Black public display');
});

test('Found - Product values - Release date', (t) => {
  const testProduct = new IcecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  t.is(testProduct.getReleaseDate(), '2015-10-04');
});

test('Found - Product values - Long description', (t) => {
  const testProduct = new IcecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  t.is(
    testProduct.getLongDescription(),
    '<b>Stylish 40” screen with 4K resolution and USB hub</b>\\n\\nThe ProLite X4071UHSU-B1 is an impressive 4K (3840 x 2160) monitor, offering a gigantic viewable area with 4 times more information and work space than a Full HD screen. Due to the high DPI (dots per inch) the monitor displays an incredibly sharp and crisp image. The VA panel technology offers exceptional colour performance, high contrast (5000:1) and wide viewing angles. PIP and PBP features allow users to easily create their own work space by displaying and manipulating multiple applications. USB 3.0 HUB, integrated speakers, headphone socket and hook, ensure compatibility across various devices and media platforms for a real multimedia experience. The ProLite X4071UHSU-B1 suits a massive range of applications including desktop publishing, CAD/CAM drawing, gaming, photographic and web design.\\n\\n<b>4K</b>\\n\\nUHD resolution (3840x2160), better known as 4K, offers a gigantic viewable area with 4 times more information and work space than a Full HD screen. Due to the high DPI (dots per inch), it displays an incredibly sharp and crisp image.\\n\\n<b>MVA</b>\\n\\nMVA technology offers higher contrast, darker blacks and much better viewing angles than standard TN technology. The screen will look good no matter what angle you look at it.\\n\\n<b>PIP</b>\\n\\nPIP (Picture in Picture) function allows you to watch images coming from two different sources at the same time.\\n\\n<b>FLICKER FREE + BLUE LIGHT</b>\\n\\nThe ultimate solution for the comfort and health of your eyes. Flicker free monitors with blue light reducer function. Absolutely no flickering. And the amount of blue light emitted by the screen and responsible for your eyes feeling fatigued substantially reduced.\\n\\n<b>SPEAKERS AND HEADPHONES</b>\\n\\nPlaying with friends? Use the integrated high quality speakers. Don’t want to disturb anybody? Plug your headset to the headphone socket and turn the volume up.'
  );
});

test('getLongDescription returns false when throwing', (t) => {
  const testProduct = new IcecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  delete testProduct.productData; // Will product null reference error
  t.is(testProduct.getLongDescription(), false);
});

test('Found - Product values - Short description', (t) => {
  const testProduct = new IcecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  t.is(
    testProduct.getShortDescription(),
    '39.5 MVA, 3 ms, 350 cd/m², 3840 x 2160, 16:9, PiP, PbP, HTCP, VESA, OSD, 3 x USB 3.0, HDMI, VGA, Black'
  );
});

test('getShortDescription returns false when throwing', (t) => {
  const testProduct = new IcecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  delete testProduct.productData; // Will product null reference error
  t.is(testProduct.getShortDescription(), false);
});

test('Found - Product values - Product info PDF url', (t) => {
  const testProduct = new IcecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  t.is(testProduct.getProductInfoPDFurl(), 'http://pdfs.icecat.biz/pdf/48068167-5427.pdf');
});

test('getProductInfoPDFurl returns false when throwing', (t) => {
  const testProduct = new IcecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  delete testProduct.productData; // Will product null reference error
  t.is(testProduct.getProductInfoPDFurl(), false);
});

test('Found - Product values - Product manual PDF url', (t) => {
  const testProduct = new IcecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  t.is(testProduct.getProductManualPDFurl(), 'http://pdfs.icecat.biz/pdf/48068167-5566-manual.pdf');
});

test('getProductManualPDFurl returns false when throwing', (t) => {
  const testProduct = new IcecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  delete testProduct.productData; // Will product null reference error
  t.is(testProduct.getProductManualPDFurl(), false);
});

test('Found - Product values - Supplier', (t) => {
  const testProduct = new IcecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  t.is(testProduct.getSupplier(), 'iiyama');
});

test('Found - Product values - Category', (t) => {
  const testProduct = new IcecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  t.is(testProduct.getCategory(), 'public displays');
});

test('Found - Product values - Family', (t) => {
  const testProduct = new IcecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  testProduct.productData.ProductFamily = [
    {
      Name: [
        {
          $: {
            ID: '1',
            Value: 'Test'
          }
        }
      ]
    }
  ];
  t.deepEqual(testProduct.getFamily(), {
    id: '1',
    name: 'Test'
  });
});

test('getFamily returns false when throwing', (t) => {
  const testProduct = new IcecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  delete testProduct.productData; // Will product null reference error
  t.is(testProduct.getFamily(), false);
});

test('Found - Product values - Name', (t) => {
  const testProduct = new IcecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  t.is(testProduct.getName(), 'X4071UHSU-B1');
});

test('Found - Product values - Url', (t) => {
  const testProduct = new IcecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  t.is(testProduct.getProductUrl(), 'http://www.iiyama.com/gl_en/products/prolite-x4071uhsu-b1/');
});

test('Found - Product values - EAN', (t) => {
  const testProduct = new IcecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  t.is(testProduct.getEan(), '4948570114344');
});

test('Found - Product values - productUrl', (t) => {
  const testProduct = new IcecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  t.is(testProduct.getProductUrl(), 'http://www.iiyama.com/gl_en/products/prolite-x4071uhsu-b1/');
});

test('getProductUrl returns false when throwing', (t) => {
  const testProduct = new IcecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  delete testProduct.productData; // Will product null reference error
  t.is(testProduct.getProductUrl(), false);
});

test('Found - Product values - Error message', (t) => {
  const testProduct = new IcecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  t.falsy(testProduct.getErrorMessage(), 'No errors when succeeding');
});

test('Found - Product values - Multimedia Objects', (t) => {
  const testProduct = new IcecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
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
});

test('getMultimedia objects returns false when throwing', (t) => {
  const testProduct = new IcecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  delete testProduct.productData; // Will product null reference error
  t.is(testProduct.getMultimediaObjects(), false);
});

test('Found - Product values - Images', (t) => {
  const testProduct = new IcecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  t.deepEqual(testProduct.getImages(), [
    {
      IsMain: 'Y',
      HighImg: 'http://images.icecat.biz/img/gallery/29900045_1198.jpg',
      LowImg: 'http://images.icecat.biz/img/gallery_lows/29900045_1198.jpg',
      ThumbImg: 'http://images.icecat.biz/img/gallery_thumbs/29900045_1198.jpg'
    },
    {
      IsMain: undefined,
      HighImg: 'http://images.icecat.biz/img/gallery/29900045_3889.jpg',
      LowImg: 'http://images.icecat.biz/img/gallery_lows/29900045_3889.jpg',
      ThumbImg: 'http://images.icecat.biz/img/gallery_thumbs/29900045_3889.jpg'
    },
    {
      IsMain: undefined,
      HighImg: 'http://images.icecat.biz/img/gallery/29900045_6765.jpg',
      LowImg: 'http://images.icecat.biz/img/gallery_lows/29900045_6765.jpg',
      ThumbImg: 'http://images.icecat.biz/img/gallery_thumbs/29900045_6765.jpg'
    },
    {
      IsMain: undefined,
      HighImg: 'http://images.icecat.biz/img/gallery/29900045_0569.jpg',
      LowImg: 'http://images.icecat.biz/img/gallery_lows/29900045_0569.jpg',
      ThumbImg: 'http://images.icecat.biz/img/gallery_thumbs/29900045_0569.jpg'
    },
    {
      IsMain: undefined,
      HighImg: 'http://images.icecat.biz/img/gallery/29900045_5438.jpg',
      LowImg: 'http://images.icecat.biz/img/gallery_lows/29900045_5438.jpg',
      ThumbImg: 'http://images.icecat.biz/img/gallery_thumbs/29900045_5438.jpg'
    },
    {
      IsMain: undefined,
      HighImg: 'http://images.icecat.biz/img/gallery/29900045_9148.jpg',
      LowImg: 'http://images.icecat.biz/img/gallery_lows/29900045_9148.jpg',
      ThumbImg: 'http://images.icecat.biz/img/gallery_thumbs/29900045_9148.jpg'
    },
    {
      IsMain: undefined,
      HighImg: 'http://images.icecat.biz/img/gallery/29900045_7312.jpg',
      LowImg: 'http://images.icecat.biz/img/gallery_lows/29900045_7312.jpg',
      ThumbImg: 'http://images.icecat.biz/img/gallery_thumbs/29900045_7312.jpg'
    },
    {
      IsMain: undefined,
      HighImg: 'http://images.icecat.biz/img/gallery/29900045_6984.jpg',
      LowImg: 'http://images.icecat.biz/img/gallery_lows/29900045_6984.jpg',
      ThumbImg: 'http://images.icecat.biz/img/gallery_thumbs/29900045_6984.jpg'
    },
    {
      IsMain: undefined,
      HighImg: 'http://images.icecat.biz/img/gallery/29900045_6068.jpg',
      LowImg: 'http://images.icecat.biz/img/gallery_lows/29900045_6068.jpg',
      ThumbImg: 'http://images.icecat.biz/img/gallery_thumbs/29900045_6068.jpg'
    },
    {
      IsMain: undefined,
      HighImg: 'http://images.icecat.biz/img/gallery/29900045_4628.jpg',
      LowImg: 'http://images.icecat.biz/img/gallery_lows/29900045_4628.jpg',
      ThumbImg: 'http://images.icecat.biz/img/gallery_thumbs/29900045_4628.jpg'
    },
    {
      IsMain: undefined,
      HighImg: 'http://images.icecat.biz/img/gallery/29900045_9043.jpg',
      LowImg: 'http://images.icecat.biz/img/gallery_lows/29900045_9043.jpg',
      ThumbImg: 'http://images.icecat.biz/img/gallery_thumbs/29900045_9043.jpg'
    },
    {
      IsMain: undefined,
      HighImg: 'http://images.icecat.biz/img/gallery/29900045_6129.jpg',
      LowImg: 'http://images.icecat.biz/img/gallery_lows/29900045_6129.jpg',
      ThumbImg: 'http://images.icecat.biz/img/gallery_thumbs/29900045_6129.jpg'
    }
  ]);
});

test('Found - Product values - Images missing 1', (t) => {
  const testProduct = new IcecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  testProduct.productData.ProductGallery[0].ProductPicture = [];

  t.deepEqual(testProduct.getImages(), undefined);
});

test('Found - Product values - Images missing 2', (t) => {
  const testProduct = new IcecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  testProduct.productData.ProductGallery = [];

  t.deepEqual(testProduct.getImages(), undefined);
});

test('Found - Product values - ProductGallery missing', (t) => {
  const testProduct = new IcecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  delete testProduct.productData.ProductGallery;

  t.deepEqual(testProduct.getImages(), undefined);
});

test('Found - Product values - Specifications', (t) => {
  const testProduct = new IcecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
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
});

test('Not found - Create Product', (t) => {
  const testProduct = new IcecatProduct(icecatProductJSONNotFound, icecatProductXMLNotFound, requestUrl);
  t.truthy(testProduct instanceof IcecatProduct);
  t.is(testProduct.requestUrl, requestUrl);
});

test('Not found - Return code Fail', (t) => {
  const testProduct = new IcecatProduct(icecatProductJSONNotFound, icecatProductXMLNotFound, requestUrl);
  t.is(testProduct.getReturnCode(), testProduct.returnCode.FAIL);
});

test('Found - Product values - Category feature groups', (t) => {
  const testProduct = new IcecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
  t.deepEqual(testProduct.getCategoryFeatureGroups(), [
    { id: '10074', name: 'Display' },
    { id: '10080', name: 'Audio' },
    { id: '10083', name: 'Ports & interfaces' },
    { id: '10073', name: 'Weight & dimensions' },
    { id: '10081', name: 'Power' },
    { id: '10084', name: 'Operational conditions' },
    { id: '10871', name: 'Technical details' },
    { id: '10078', name: 'Packaging data' },
    { id: '10101', name: 'Other features' },
    { id: '10869', name: 'Design' },
    { id: '10870', name: 'Performance' },
    { id: '16263', name: 'Computer system' }
  ]);
});

test('getCategoryFeatureGroups returns false if it throws', (t) => {
  const testProduct = new IcecatProduct({ 'ICECAT-interface': { Product: [] } });

  const res = testProduct.getCategoryFeatureGroups();

  t.false(res);
});
