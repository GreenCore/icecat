# Icecat API
[![Version][npm-image]][npm-url] ![License][license-image]


With this package you can read the worldwide product information data from Icecat. This product information comes from editors like participating manufacturers. You can use this package for comparison websites, online shopping directories or enterprise resource planning systems. 



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

// Language: en, GTIN: 4948570114344 (GTIN: EAN, UPC or JAN) 
icecatClient.openCatalog.getProduct('en', '4948570114344').then(function (product) {
    console.log('Description: ' + product.getLongDescription());
    
    const productImages = product.getImages();

    console.log('Product images:');
    for (let i in productImages) {
        console.log(productImages[i].TumbImg);
    }
    
}).catch(function (reason) {
    console.error('Error or timeout', reason);
});
```

# Product info

getReturnCode
- returnCode.FAIL
- returnCode.SUCCESS

getName
returns Product Name {string}

getTitle
returns Product Title {string}

getReleaseDate
returns Product Release Date YYYY-MM-DD {string}

getLongDescription
returns {string}

getShortDescription
returns {string}

getProductInfoPDFurl
returns {string}

getProductManualPDFurl
returns {string}

getProductUrl
returns {string}

getSupplier
returns {string}

getCategory
returns {string}

getEan
returns {string}

getImages
returns {array}

getSpecifications
returns {array}

getMultimediaObjects
returns {Array}

# About Icecat

| Icecat           | Url                                       |
|------------------|-------------------------------------------|
| services         | http://icecat.us/menu/services/index.html |
| product info     | http://icecat.us/                         | 

# License
[MIT License](https://github.com/GreenCore/icecat/blob/master/LICENSE)

[npm-image]: https://img.shields.io/npm/v/icecat.svg
[npm-url]: https://npmjs.org/package/icecat
[license-image]: https://img.shields.io/npm/l/icecat.svg