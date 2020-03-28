# Icecat API

[![Version][npm-image]][npm-url]
![License][license-image]
[![Build Status][gh-workflow-image]][gh-workflow-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]

With this package you can read the worldwide product information data from Icecat.
This product information comes from editors like participating manufacturers. You can use this package for webshops,
comparison websites, online shopping directories or enterprise resource planning systems.

# Getting started

## 1) Icecat account

To create a Icecat account, go to the [Icecat registration](https://icecat.biz/registration/) page.

## 2) Installation

Install the Icecat Node.js package by running the following command within your project's root directory:

```
npm install icecat --save
```

## 3) Basic usage

```js
const icecat = require('icecat');

const icecatClient = new icecat('username', 'password');

// Language: en, GTIN: 4948570114344 (GTIN: EAN, UPC or GTIN-13/JAN)
icecatClient.openCatalog
  .getProduct('EN', '4948570114344')
  .then(function(product) {
    console.log('Description: ' + product.getLongDescription());

    const productImages = product.getImages();

    console.log('Product images:');
    for (let i in productImages) {
      console.log(productImages[i].ThumbImg);
    }
  })
  .catch(function(reason) {
    console.error('Error or timeout', reason);
  });
```

Demo: https://runkit.com/greencore/icecat-demo

# openCatalog

## getProduct(Language, GTIN)

Arguments:

- Language: [Supported language codes.](Languages.md)
- GTIN: EAN, UPC or GTIN-13/JAN

Returns: productObject

## getProductById(Language, ProductId)

Arguments:

- Language: [Supported language codes.](Languages.md)
- ProductId: ProductId from Icecat

Returns: productObject

## getProductBySKU(Language, Brand, SKU)

Arguments:

- Language: [Supported language codes.](Languages.md)
- Brand: Product brand
- SKU: Product SKU from manufacturer

Returns: productObject

## getProductByXMLdata (xmldata)

Arguments:

- xmlData: XML data from an Icecat XML file or XML web service

Returns: productObject

## productObject

**_getReturnCode_**

- returnCode.FAIL (-1)
- returnCode.SUCCESS (1)

**_getErrorMessage_**
<br/>
returns ErrorMessage {string}
<br/>Example: The requested XML data-sheet is not present in the Icecat database.

**_getName_**
<br/>
returns Product Name {string}
<br/>Example: X4071UHSU-B1

**_getTitle_**
<br/>
returns Product Title {string}
<br/>Example: iiyama X4071UHSU-B1 39.5" LED 4K Ultra HD Black public display

**_getReleaseDate_**
<br/>
returns Product Release Date YYYY-MM-DD {string}
<br/>Example: 2015-10-04

**_getLongDescription_**
<br/>
returns {string}

**_getShortDescription_**
<br/>
returns {string}

**_getProductInfoPDFurl_**
<br/>
returns {string}
<br/>Example: http://pdfs.icecat.biz/pdf/48068167-5427.pdf

**_getProductManualPDFurl_**
<br/>
returns {string}

**_getProductUrl_**
<br/>
returns {string}

**_getSupplier_**
<br/>
returns {string}
<br/>Example: iiyama

**_getCategory_**
<br/>
returns {string}
<br/>Example: public displays

**_getFamily_**
<br/>
returns {object}
<br/>Example: {"id":"30340","name":"ProLite"}

**_getId_**
<br/>
Get the Icecat product ID<br/>
returns {string}
<br/>Example: 29900045

**_getEan_**
<br/>
Get the first EAN from the productXML
<br/>
returns {string}
<br/>Example: 4948570114344

**_getImages_**
<br/>
returns {array}
<br/>Example:

```js
[
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
  }
];
```

**_getSpecifications_**
<br/>
returns {array}

**_getMultimediaObjects_**
<br/>
returns {Array}

**_getCategoryFeatureGroups_**
<br/>
returns {Array}
<br/>Example:

```js
[
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
];
```

# About Icecat

| Icecat       | Url                                         |
| ------------ | ------------------------------------------- |
| services     | https://icecat.biz/menu/services/index.html |
| product info | https://icecat.biz/                         |

# License

[MIT License](https://github.com/GreenCore/icecat/blob/master/LICENSE)

[npm-image]: https://img.shields.io/npm/v/icecat.svg
[npm-url]: https://npmjs.org/package/icecat
[travis-image]: https://travis-ci.org/GreenCore/icecat.svg?branch=master
[travis-url]: https://travis-ci.org/GreenCore/icecat
[snyk-image]: https://snyk.io/test/github/GreenCore/icecat/badge.svg
[snyk-url]: https://snyk.io/test/github/GreenCore/icecat
[license-image]: https://img.shields.io/npm/l/icecat.svg
[gh-workflow-image]: https://github.com/GreenCore/icecat/workflows/Node.js%20CI/badge.svg
[gh-workflow-url]: https://github.com/GreenCore/icecat/actions?query=workflow%3A%22Node.js+CI%22
