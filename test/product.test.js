'use strict';

const path = require('path');
const fs = require('fs');
const IcecatProduct = require('../lib/OpenCatalog/product');

const icecatProductJSONFound = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/0190781289012.json'), 'utf8'));
const icecatProductXMLFound = fs.readFileSync(path.join(__dirname, 'fixtures/0190781289012.xml'), 'utf8');
const icecatProductJSONNotFound = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/12345.json'), 'utf8'));
const icecatProductXMLNotFound = fs.readFileSync(path.join(__dirname, 'fixtures/12345.xml'), 'utf8');
const requestUrl = 'https://user:password@data.icecat.biz/response';

let testProduct;
beforeEach(() => {
  testProduct = new IcecatProduct(icecatProductJSONFound, icecatProductXMLFound, requestUrl);
});

test('Found - Create Product', () => {
  expect(testProduct instanceof IcecatProduct).toBeTruthy();
  expect(testProduct.requestUrl).toBe(requestUrl);
});

test('Found - Return code Success', () => {
  expect(testProduct.getReturnCode()).toBe(testProduct.returnCode.SUCCESS);
});

test('Found - Get JSON data', () => {
  expect(testProduct.getJSON()).toBe(icecatProductJSONFound);
});

test('Found - Get XML data', () => {
  expect(testProduct.getXML()).toBe(icecatProductXMLFound);
});

test('Found - Product values - ID', () => {
  expect(testProduct.getID()).toBe('39302897');
});

test('Found - Product values - Title', () => {
  expect(testProduct.getTitle()).toBe(
    'HP EliteDisplay E273m 68.6 cm (27") 1920 x 1080 pixels Full HD LED Black, Silver'
  );
});

test('Found - Product values - Release date', () => {
  expect(testProduct.getReleaseDate()).toBe('2017-11-01');
});

test('Found - Product values - Long description', () => {
  expect(testProduct.getLongDescription()).toBe(
    '<b>A strikingly modern business collaboration companion</b>\nConnect and collaborate in complete comfort on the HP EliteDisplay E273m 68.58 cm (27") Monitor, which is Skype for Business® certified for optimal video and audio experiences between displays and has a 3-sided micro-edge bezel for seamless multi-display<sup>[1]</sup> tiling and 4-way adjustable ergonomics.'
  );
});

test('getLongDescription returns false when throwing', () => {
  delete testProduct.productData; // Will product null reference error
  expect(testProduct.getLongDescription()).toBe(false);
});

test('Found - Product values - Short description', () => {
  expect(testProduct.getShortDescription()).toBe('27", Full HD 1920 x 1080, 16:9, 250cd/m²');
});

test('getShortDescription returns false when throwing', () => {
  delete testProduct.productData; // Will product null reference error
  expect(testProduct.getShortDescription()).toBe(false);
});

test('Found - Product values - Product info PDF url', () => {
  expect(testProduct.getProductInfoPDFurl()).toBe('');
});

test('getProductInfoPDFurl returns false when throwing', () => {
  delete testProduct.productData; // Will product null reference error
  expect(testProduct.getProductInfoPDFurl()).toBe(false);
});

test('Found - Product values - Product manual PDF url', () => {
  expect(testProduct.getProductManualPDFurl()).toBe('');
});

test('getProductManualPDFurl returns false when throwing', () => {
  delete testProduct.productData; // Will product null reference error
  expect(testProduct.getProductManualPDFurl()).toBe(false);
});

test('Found - Product values - Supplier', () => {
  expect(testProduct.getSupplier()).toBe('HP');
});

test('Found - Product values - Category', () => {
  expect(testProduct.getCategory()).toBe('Computer Monitors');
});

test('Found - Product values - Family', () => {
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
  expect(testProduct.getFamily()).toEqual({
    id: '1',
    name: 'Test'
  });
});

test('getFamily returns false when throwing', () => {
  delete testProduct.productData; // Will product null reference error
  expect(testProduct.getFamily()).toBe(false);
});

test('Found - Product values - Name', () => {
  expect(testProduct.getName()).toBe('E273m');
});

test('Found - Product values - Url', () => {
  expect(testProduct.getProductUrl()).toBe('http://www.hp.com/');
});

test('Found - Product values - EAN', () => {
  expect(testProduct.getEan()).toBe('0190781289012');
});

test('Found - Product values - productUrl', () => {
  expect(testProduct.getProductUrl()).toBe('http://www.hp.com/');
});

test('getProductUrl returns false when throwing', () => {
  delete testProduct.productData; // Will product null reference error
  expect(testProduct.getProductUrl()).toBe(false);
});

test('Found - Product values - Error message', () => {
  expect(testProduct.getErrorMessage()).toBeFalsy();
});

test('Found - Product values - Multimedia Objects', () => {
  expect(testProduct.getMultimediaObjects()).toEqual([
    {
      contentType: 'image/png',
      description: 'EU Energy Label',
      thumbPic: undefined,
      keepAsURL: '0',
      size: '46483',
      url: 'https://objects.icecat.biz/objects/mmo_39302897_1624376119_047_47638.png'
    }
  ]);
});

test('getMultimedia objects returns false when throwing', () => {
  delete testProduct.productData; // Will product null reference error
  expect(testProduct.getMultimediaObjects()).toBe(false);
});

test('Found - Product values - Images', () => {
  expect(testProduct.getImages()).toEqual([
    {
      IsMain: 'Y',
      HighImg: 'https://images.icecat.biz/img/gallery/39302897_3599208444.jpg',
      LowImg: 'https://images.icecat.biz/img/gallery_lows/39302897_3599208444.jpg',
      ThumbImg: 'https://images.icecat.biz/img/gallery_thumbs/39302897_3599208444.jpg'
    },
    {
      IsMain: undefined,
      HighImg: 'https://images.icecat.biz/img/gallery/39302897_1075617243.jpg',
      LowImg: 'https://images.icecat.biz/img/gallery_lows/39302897_1075617243.jpg',
      ThumbImg: 'https://images.icecat.biz/img/gallery_thumbs/39302897_1075617243.jpg'
    },
    {
      IsMain: undefined,
      HighImg: 'https://images.icecat.biz/img/gallery/39302897_6442797154.jpg',
      LowImg: 'https://images.icecat.biz/img/gallery_lows/39302897_6442797154.jpg',
      ThumbImg: 'https://images.icecat.biz/img/gallery_thumbs/39302897_6442797154.jpg'
    },
    {
      IsMain: undefined,
      HighImg: 'https://images.icecat.biz/img/gallery/39302897_0881622298.jpg',
      LowImg: 'https://images.icecat.biz/img/gallery_lows/39302897_0881622298.jpg',
      ThumbImg: 'https://images.icecat.biz/img/gallery_thumbs/39302897_0881622298.jpg'
    },
    {
      IsMain: undefined,
      HighImg: 'https://images.icecat.biz/img/gallery/39302897_4651978094.jpg',
      LowImg: 'https://images.icecat.biz/img/gallery_lows/39302897_4651978094.jpg',
      ThumbImg: 'https://images.icecat.biz/img/gallery_thumbs/39302897_4651978094.jpg'
    },
    {
      IsMain: undefined,
      HighImg: 'https://images.icecat.biz/img/feature_logo/193-367.png',
      LowImg: '',
      ThumbImg: 'https://images.icecat.biz/img/feature_logo_thumbs/193-367.png'
    },
    {
      IsMain: undefined,
      HighImg: 'https://images.icecat.biz/img/feature_logo/216-1837.png',
      LowImg: '',
      ThumbImg: 'https://images.icecat.biz/img/feature_logo_thumbs/216-1837.png'
    },
    {
      IsMain: undefined,
      HighImg: 'https://images.icecat.biz/img/feature_logo/195-7422.png',
      LowImg: '',
      ThumbImg: 'https://images.icecat.biz/img/feature_logo_thumbs/195-7422.png'
    },
    {
      IsMain: undefined,
      HighImg: 'https://images.icecat.biz/img/feature_logo/225-9265.png',
      LowImg: '',
      ThumbImg: 'https://images.icecat.biz/img/feature_logo_thumbs/225-9265.png'
    },
    {
      IsMain: undefined,
      HighImg: 'https://images.icecat.biz/img/feature_logo/217-3037.png',
      LowImg: '',
      ThumbImg: 'https://images.icecat.biz/img/feature_logo_thumbs/217-3037.png'
    },
    {
      IsMain: undefined,
      HighImg: 'https://images.icecat.biz/img/feature_logo/233-5697.png',
      LowImg: '',
      ThumbImg: 'https://images.icecat.biz/img/feature_logo_thumbs/233-5697.png'
    },
    {
      IsMain: undefined,
      HighImg: 'https://images.icecat.biz/img/feature_logo/191-6546.png',
      LowImg: '',
      ThumbImg: 'https://images.icecat.biz/img/feature_logo_thumbs/191-6546.png'
    },
    {
      IsMain: undefined,
      HighImg: 'https://images.icecat.biz/img/feature_logo/211-8810.png',
      LowImg: '',
      ThumbImg: 'https://images.icecat.biz/img/feature_logo_thumbs/211-8810.png'
    }
  ]);
});

test('Found - Product values - Images missing 1', () => {
  testProduct.productData.ProductGallery[0].ProductPicture = [];

  expect(testProduct.getImages()).toEqual(undefined);
});

test('Found - Product values - Images missing 2', () => {
  testProduct.productData.ProductGallery = [];

  expect(testProduct.getImages()).toEqual(undefined);
});

test('Found - Product values - ProductGallery missing', () => {
  delete testProduct.productData.ProductGallery;

  expect(testProduct.getImages()).toEqual(undefined);
});

test('Found - Product values - Specifications', () => {
  expect(testProduct.getSpecifications()).toEqual([
    {
      name: 'Display diagonal',
      presentationValue: '68.6 cm (27")',
      value: '27',
      specId: '11608',
      specGroupId: '100'
    },
    {
      name: 'Display resolution',
      presentationValue: '1920 x 1080 pixels',
      value: '1920 x 1080',
      specId: '9316',
      specGroupId: '100'
    },
    {
      name: 'Native aspect ratio',
      presentationValue: '16:9',
      value: '16:9',
      specId: '155124',
      specGroupId: '100'
    },
    {
      name: 'Display technology',
      presentationValue: 'LED',
      value: 'LED',
      specId: '57158',
      specGroupId: '100'
    },
    {
      name: 'Touchscreen',
      presentationValue: 'N',
      value: 'N',
      specId: '243713',
      specGroupId: '100'
    },
    {
      name: 'HD type',
      presentationValue: 'Full HD',
      value: 'Full HD',
      specId: '74099',
      specGroupId: '100'
    },
    {
      name: 'Panel type',
      presentationValue: 'IPS',
      value: 'IPS',
      specId: '255240',
      specGroupId: '100'
    },
    {
      name: 'Screen shape',
      presentationValue: 'Flat',
      value: 'Flat screen',
      specId: '133269',
      specGroupId: '100'
    },
    {
      name: 'Contrast ratio (typical)',
      presentationValue: '1000:1',
      value: '1000:1',
      specId: '4943',
      specGroupId: '100'
    },
    {
      name: 'Display number of colours',
      presentationValue: '16.78 million colours',
      value: '16.78 million colours',
      specId: '154116',
      specGroupId: '100'
    },
    {
      name: 'Display brightness (typical)',
      presentationValue: '250 cd/m²',
      value: '250',
      specId: '255214',
      specGroupId: '100'
    },
    {
      name: 'Response time',
      presentationValue: '5 ms',
      value: '5',
      specId: '5285',
      specGroupId: '100'
    },
    {
      name: 'Supported graphics resolutions',
      presentationValue:
        '640 x 480 (VGA), 720 x 400, 800 x 600 (SVGA), 1024 x 768 (XGA), 1280 x 1024 (SXGA), 1280 x 720 (HD 720), 1280 x 800 (WXGA), 1440 x 900 (WXGA+), 1600 x 900, 1680 x 1050 (WSXGA+)',
      value:
        '640 x 480 (VGA),720 x 400,800 x 600 (SVGA),1024 x 768 (XGA),1280 x 1024 (SXGA),1280 x 720 (HD 720),1280 x 800 (WXGA),1440 x 900 (WXGA+),1600 x 900,1680 x 1050 (WSXGA+)',
      specId: '22829',
      specGroupId: '100'
    },
    {
      name: 'Contrast ratio (dynamic)',
      presentationValue: '5000000:1',
      value: '5000000:1',
      specId: '31337',
      specGroupId: '100'
    },
    {
      name: 'Viewing angle, horizontal',
      presentationValue: '178°',
      value: '178',
      specId: '4940',
      specGroupId: '100'
    },
    {
      name: 'Viewing angle, vertical',
      presentationValue: '178°',
      value: '178',
      specId: '4941',
      specGroupId: '100'
    },
    {
      name: '3D',
      presentationValue: 'N',
      value: 'N',
      specId: '47973',
      specGroupId: '100'
    },
    {
      name: 'Pixel pitch',
      presentationValue: '0.311 x 0.311 mm',
      value: '0.311 x 0.311',
      specId: '1992',
      specGroupId: '100'
    },
    {
      name: 'Horizontal scan range',
      presentationValue: '30 - 80 kHz',
      value: '30 - 80',
      specId: '2548',
      specGroupId: '100'
    },
    {
      name: 'Vertical scan range',
      presentationValue: '50 - 60 Hz',
      value: '50 - 60',
      specId: '4931',
      specGroupId: '100'
    },
    {
      name: 'Viewable size, horizontal',
      presentationValue: '59.8 cm',
      value: '597.8',
      specId: '4938',
      specGroupId: '100'
    },
    {
      name: 'Viewable size, vertical',
      presentationValue: '33.6 cm',
      value: '336.3',
      specId: '4939',
      specGroupId: '100'
    },
    {
      name: 'RGB colour space',
      presentationValue: 'NTSC',
      value: 'NTSC',
      specId: '594926',
      specGroupId: '100'
    },
    {
      name: 'Colour gamut',
      presentationValue: '72%',
      value: '72',
      specId: '103146',
      specGroupId: '100'
    },
    {
      name: 'NVIDIA G-SYNC',
      presentationValue: 'N',
      value: 'N',
      specId: '123176',
      specGroupId: '10681'
    },
    {
      name: 'AMD FreeSync',
      presentationValue: 'N',
      value: 'N',
      specId: '193707',
      specGroupId: '10681'
    },
    {
      name: 'Built-in speaker(s)',
      presentationValue: 'Y',
      value: 'Y',
      specId: '31341',
      specGroupId: '10887'
    },
    {
      name: 'Built-in camera',
      presentationValue: 'Y',
      value: 'Y',
      specId: '67278',
      specGroupId: '10887'
    },
    {
      name: 'Number of speakers',
      presentationValue: '2',
      value: '2',
      specId: '207681',
      specGroupId: '10887'
    },
    {
      name: 'RMS rated power',
      presentationValue: '4 W',
      value: '4',
      specId: '17100',
      specGroupId: '10887'
    },
    {
      name: 'Market positioning',
      presentationValue: 'Business',
      value: 'Business',
      specId: '245761',
      specGroupId: '10677'
    },
    {
      name: 'Product colour',
      presentationValue: 'Black, Silver',
      value: 'Black,Silver',
      specId: '11218',
      specGroupId: '10677'
    },
    {
      name: 'Country of origin',
      presentationValue: 'China',
      value: 'China',
      specId: '114074',
      specGroupId: '10677'
    },
    {
      name: 'Built-in USB hub',
      presentationValue: 'Y',
      value: 'Y',
      specId: '139339',
      specGroupId: '1742'
    },
    {
      name: 'USB hub version',
      presentationValue: '3.2 Gen 1 (3.1 Gen 1)',
      value: '3.2 Gen 1 (3.1 Gen 1)',
      specId: '139340',
      specGroupId: '1742'
    },
    {
      name: 'USB upstream port type',
      presentationValue: 'USB Type-C',
      value: 'USB Type-C',
      specId: '139342',
      specGroupId: '1742'
    },
    {
      name: 'Number of upstream ports',
      presentationValue: '1',
      value: '1',
      specId: '139344',
      specGroupId: '1742'
    },
    {
      name: 'USB Type-A downstream ports quantity',
      presentationValue: '2',
      value: '2',
      specId: '139347',
      specGroupId: '1742'
    },
    {
      name: 'VGA (D-Sub) ports quantity',
      presentationValue: '1',
      value: '1',
      specId: '17095',
      specGroupId: '1742'
    },
    {
      name: 'DVI port',
      presentationValue: 'N',
      value: 'N',
      specId: '86530',
      specGroupId: '1742'
    },
    {
      name: 'HDMI ports quantity',
      presentationValue: '1',
      value: '1',
      specId: '20882',
      specGroupId: '1742'
    },
    {
      name: 'DisplayPorts quantity',
      presentationValue: '1',
      value: '1',
      specId: '35722',
      specGroupId: '1742'
    },
    {
      name: 'Audio input',
      presentationValue: 'Y',
      value: 'Y',
      specId: '17098',
      specGroupId: '1742'
    },
    {
      name: 'Audio output',
      presentationValue: 'Y',
      value: 'Y',
      specId: '17099',
      specGroupId: '1742'
    },
    {
      name: 'HDCP',
      presentationValue: 'Y',
      value: 'Y',
      specId: '26708',
      specGroupId: '1742'
    },
    {
      name: 'VESA mounting',
      presentationValue: 'Y',
      value: 'Y',
      specId: '109688',
      specGroupId: '3070'
    },
    {
      name: 'Cable lock slot',
      presentationValue: 'Y',
      value: 'Y',
      specId: '14296',
      specGroupId: '3070'
    },
    {
      name: 'Height adjustment',
      presentationValue: 'Y',
      value: 'Y',
      specId: '68504',
      specGroupId: '3070'
    },
    {
      name: 'Panel mounting interface',
      presentationValue: '100 x 100 mm',
      value: '100 x 100',
      specId: '22159',
      specGroupId: '3070'
    },
    {
      name: 'Height adjustment',
      presentationValue: '15 cm',
      value: '150',
      specId: '39711',
      specGroupId: '3070'
    },
    {
      name: 'Pivot',
      presentationValue: 'Y',
      value: 'Y',
      specId: '16130',
      specGroupId: '3070'
    },
    {
      name: 'Pivot angle',
      presentationValue: '0 - 90°',
      value: '0 - 90',
      specId: '48001',
      specGroupId: '3070'
    },
    {
      name: 'Swivelling',
      presentationValue: 'Y',
      value: 'Y',
      specId: '71482',
      specGroupId: '3070'
    },
    {
      name: 'Swivel angle range',
      presentationValue: '-45 - 45°',
      value: '-45 - 45',
      specId: '9092',
      specGroupId: '3070'
    },
    {
      name: 'Tiltable',
      presentationValue: 'Y',
      value: 'Y',
      specId: '683957',
      specGroupId: '3070'
    },
    {
      name: 'Tilt angle range',
      presentationValue: '-5 - 22°',
      value: '-5 - 22',
      specId: '18150',
      specGroupId: '3070'
    },
    {
      name: 'On Screen Display (OSD) languages',
      presentationValue:
        'Simplified Chinese, Traditional Chinese, German, Dutch, English, Spanish, French, Italian, Japanese, Portuguese',
      value: 'CHI (SIMPL),CHI (TR),DEU,DUT,ENG,ESP,FRE,ITA,JPN,POR',
      specId: '22175',
      specGroupId: '3070'
    },
    {
      name: 'Plug and Play',
      presentationValue: 'Y',
      value: 'Y',
      specId: '15669',
      specGroupId: '3070'
    },
    {
      name: 'Thin client installed',
      presentationValue: 'N',
      value: 'N',
      specId: '48010',
      specGroupId: '3289'
    },
    {
      name: 'Power consumption (typical)',
      presentationValue: '32 W',
      value: '32',
      specId: '9931',
      specGroupId: '99'
    },
    {
      name: 'Power consumption (standby)',
      presentationValue: '0.5 W',
      value: '0.5',
      specId: '9930',
      specGroupId: '99'
    },
    {
      name: 'Power consumption (max)',
      presentationValue: '68 W',
      value: '68',
      specId: '65572',
      specGroupId: '99'
    },
    {
      name: 'AC input voltage',
      presentationValue: '100 - 240 V',
      value: '100 - 240',
      specId: '122959',
      specGroupId: '99'
    },
    {
      name: 'AC input frequency',
      presentationValue: '50 - 60 Hz',
      value: '50 - 60',
      specId: '122960',
      specGroupId: '99'
    },
    {
      name: 'Annual energy consumption',
      presentationValue: '46.72 kWh',
      value: '46.72',
      specId: '62854',
      specGroupId: '99'
    },
    {
      name: 'Operating temperature (T-T)',
      presentationValue: '5 - 35 °C',
      value: '5 - 35',
      specId: '5557',
      specGroupId: '1205'
    },
    {
      name: 'Operating relative humidity (H-H)',
      presentationValue: '20 - 80%',
      value: '20 - 80',
      specId: '4997',
      specGroupId: '1205'
    },
    {
      name: 'Sustainability certificates',
      presentationValue: 'EPEAT Gold, ENERGY STAR',
      value: 'EPEAT Gold,ENERGY STAR',
      specId: '603799',
      specGroupId: '72250'
    },
    {
      name: 'Width (with stand)',
      presentationValue: '610 mm',
      value: '610',
      specId: '22203',
      specGroupId: '98'
    },
    {
      name: 'Depth (with stand)',
      presentationValue: '214 mm',
      value: '214',
      specId: '22162',
      specGroupId: '98'
    },
    {
      name: 'Height (with stand)',
      presentationValue: '384 mm',
      value: '384',
      specId: '22171',
      specGroupId: '98'
    },
    {
      name: 'Weight (with stand)',
      presentationValue: '7.9 kg',
      value: '7900',
      specId: '112042',
      specGroupId: '98'
    },
    {
      name: 'Width (without stand)',
      presentationValue: '61 cm',
      value: '610',
      specId: '91400',
      specGroupId: '98'
    },
    {
      name: 'Depth (without stand)',
      presentationValue: '4.75 cm',
      value: '47.5',
      specId: '91489',
      specGroupId: '98'
    },
    {
      name: 'Height (without stand)',
      presentationValue: '38.9 cm',
      value: '389',
      specId: '91538',
      specGroupId: '98'
    },
    {
      name: 'Weight (without stand)',
      presentationValue: '5.05 kg',
      value: '5050',
      specId: '684552',
      specGroupId: '98'
    },
    {
      name: 'Cables included',
      presentationValue: 'AC, DisplayPort, USB Type-C to USB Type-A, VGA',
      value: 'AC,DisplayPort,USB Type-C to USB Type-A,VGA',
      specId: '16133',
      specGroupId: '23760'
    },
    {
      name: 'Harmonized System (HS) code',
      presentationValue: '85285210',
      value: '85285210',
      specId: '711548',
      specGroupId: '27535'
    },
    {
      name: 'Display',
      presentationValue: 'LED',
      value: 'LED',
      specId: '3685',
      specGroupId: '8454'
    },
    {
      name: 'On/off switch',
      presentationValue: 'Y',
      value: 'Y',
      specId: '65573',
      specGroupId: '8454'
    },
    {
      name: 'TV tuner integrated',
      presentationValue: 'N',
      value: 'N',
      specId: '18144',
      specGroupId: '8454'
    },
    {
      name: 'Energy efficiency class (old)',
      presentationValue: 'A',
      value: 'A',
      specId: '708253',
      specGroupId: '8454'
    }
  ]);
});

test('Not found - Create Product', () => {
  const testProduct = new IcecatProduct(icecatProductJSONNotFound, icecatProductXMLNotFound, requestUrl);
  expect(testProduct instanceof IcecatProduct).toBeTruthy();
  expect(testProduct.requestUrl).toBe(requestUrl);
});

test('Not found - Return code Fail', () => {
  const testProduct = new IcecatProduct(icecatProductJSONNotFound, icecatProductXMLNotFound, requestUrl);
  expect(testProduct.getReturnCode()).toBe(testProduct.returnCode.FAIL);
});

test('Found - Product values - Category feature groups', () => {
  expect(testProduct.getCategoryFeatureGroups()).toEqual([
    { id: '32003', name: 'Technical details' },
    { id: '100', name: 'Display' },
    { id: '1742', name: 'Ports & interfaces' },
    { id: '98', name: 'Weight & dimensions' },
    { id: '99', name: 'Power' },
    { id: '1205', name: 'Operational conditions' },
    { id: '65611', name: 'Network' },
    { id: '23760', name: 'Packaging data' },
    { id: '41676', name: 'Certificates' },
    { id: '3070', name: 'Ergonomics' },
    { id: '3289', name: 'Thin Client' },
    { id: '49260', name: 'Packaging content' },
    { id: '53731', name: 'Battery' },
    { id: '26493', name: 'Brand-specific features' },
    { id: '8454', name: 'Other features' },
    { id: '10677', name: 'Design' },
    { id: '10681', name: 'Performance' },
    { id: '33683', name: 'Features' },
    { id: '10887', name: 'Multimedia' },
    { id: '27535', name: 'Logistics data' },
    { id: '60227', name: 'Supplier features' },
    { id: '27531', name: 'Recycling data' },
    { id: '72250', name: 'Sustainability' }
  ]);
});

test('getCategoryFeatureGroups returns false if it throws', () => {
  const testProduct = new IcecatProduct({ 'ICECAT-interface': { Product: [] } });

  const res = testProduct.getCategoryFeatureGroups();

  expect(res).toBe(false);
});
