# Icecat API
[![Version][npm-image]][npm-url] ![License][license-image]


**Work In Progress**


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

Icecat = new icecat('username', 'password');

// Language: en, EAN: 4948570114344 
Icecat.openCatalog.getProduct('en', '4948570114344').then(function (product) {
    console.log('Contents: ' + product.getLongDescription());
}).catch(function (reason) {
    console.error('Error or timeout', reason);
});
```


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