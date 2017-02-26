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
var Icecat = require('icecat');

var IcecatInstance = new Icecat(username, password, lang, ean);
```



More about Icecat services:
- http://icecat.us/menu/services/index.html


# License
[MIT License](https://github.com/GreenCore/icecat/blob/master/LICENSE)

[npm-image]: https://img.shields.io/npm/v/icecat.svg
[npm-url]: https://npmjs.org/package/icecat
[license-image]: https://img.shields.io/npm/l/icecat.svg