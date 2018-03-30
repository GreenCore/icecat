'use strict';

/**
 *
 * @param {Object} jsonData
 * @param {string} jsonData[].Product
 * @param {string} xmlData
 * @param {string} requestUrl
 */
const icecat = function (jsonData, xmlData, requestUrl) {
    this.xmlData = xmlData;
    this.jsonData = jsonData;
    this.productData = jsonData['ICECAT-interface'].Product[0];
    this.requestUrl = requestUrl;
    this.returnCode = {
        FAIL: -1,
        SUCCESS: 1
    }
};

/**
 * getJSON
 * @returns {string}
 */
icecat.prototype.getJSON = function () {
    return this.jsonData;
};

/**
 * getXML
 * @returns {string}
 */
icecat.prototype.getXML = function () {
    return this.xmlData;
};

/**
 * getReturnCode
 * Example  returns -1 || 1
 * @returns {String}
 */
icecat.prototype.getReturnCode = function () {
    return parseInt(this.productData['$'].Code, 10);
};

/**
 * getErrorMessage
 * @returns {string}
 */
icecat.prototype.getErrorMessage = function () {
    return this.productData['$'].ErrorMessage;
};

/**
 * getName
 *
 * @returns Product Name {string}
 */
icecat.prototype.getName = function () {
    return this.productData['$'].Name;
};

/**
 * getTitle
 *
 * @returns Product Title {string}
 */
icecat.prototype.getTitle = function () {
    return this.productData['$'].Title;
};

/**
 * getReleaseDate
 *
 * @returns Product Release Date YYYY-MM-DD {string}
 */
icecat.prototype.getReleaseDate = function () {
    return this.productData['$'].ReleaseDate;
};

/**
 * getLongDescription
 * @returns {string}
 */
icecat.prototype.getLongDescription = function () {
    try {
        return this.productData.ProductDescription[0]['$'].LongDesc;
    } catch (e) {
        return false;
    }
};

/**
 * getShortDescription
 * @returns {string}
 */
icecat.prototype.getShortDescription = function () {
    try {
        return this.productData.ProductDescription[0]['$'].ShortDesc;
    } catch (e) {
        return false;
    }
};

/**
 * getProductInfoPDFurl
 * @returns {string}
 */
icecat.prototype.getProductInfoPDFurl = function () {
    try {
        return this.productData.ProductDescription[0]['$'].PDFURL;
    } catch (e) {
        return false;
    }
};

/**
 * getProductManualPDFurl
 * @returns {string}
 */
icecat.prototype.getProductManualPDFurl = function () {
    try {
        return this.productData.ProductDescription[0]['$'].PDFURL;
    } catch (e) {
        return false;
    }
};

/**
 * getProductUrl
 * @returns {string}
 */
icecat.prototype.getProductUrl = function () {
    try {
        return this.productData.ProductDescription[0]['$'].URL;
    } catch (e) {
        return false;
    }
};

/**
 * getSupplier
 * @returns {string}
 */
icecat.prototype.getSupplier = function () {
    return this.productData.Supplier[0]['$'].Name;
};

/**
 * getCategory
 * @returns {string}
 */
icecat.prototype.getCategory = function () {
    return this.productData.Category[0].Name[0]['$'].Value;
};

/**
 * getFamily
 * @returns {Object}
 */
icecat.prototype.getFamily = function () {
    try {
        return {
            id: this.productData.ProductFamily[0].Name[0]['$'].ID,
            name: this.productData.ProductFamily[0].Name[0]['$'].Value
        }
    } catch (e) {
        return false;
    }
};

/**
 * getID
 * @returns {string}
 */
icecat.prototype.getID = function () {
    return this.productData['$'].ID;
};

/**
 * getEan
 * @returns {string}
 */
icecat.prototype.getEan = function () {
    return this.productData.EANCode[0]['$'].EAN;
};

/**
 * getImages
 * @returns {array}
 */
icecat.prototype.getImages = function () {
    let images = [];

    for (let img of this.productData.ProductGallery[0].ProductPicture) {
        const imageSet = {};
        imageSet.IsMain = img['$']['IsMain'];
        imageSet.HighImg = img['$']['Pic'];
        imageSet.LowImg = img['$']['LowPic'];
        imageSet.TumbImg = img['$']['ThumbPic'];

        images.push(imageSet);
    }

    return images;
};

/**
 * getSpecifications
 * @returns {array}
 */
icecat.prototype.getSpecifications = function () {
    let ProductFeatures = [];

    for (let pSpec of this.productData.ProductFeature) {
        let specSet = {};

        specSet.name = pSpec.Feature[0].Name[0]['$'].Value;
        specSet.presentationValue = pSpec['$'].Presentation_Value;
        specSet.value = pSpec['$'].Value;
        specSet.specId = pSpec['$'].CategoryFeature_ID;
        specSet.specGroupId = pSpec['$'].CategoryFeatureGroup_ID;

        ProductFeatures.push(specSet);
    }

    return ProductFeatures;
};

/**
 * getMultimediaObjects
 * @returns {Array}
 */
icecat.prototype.getMultimediaObjects = function () {
    let MultimediaObjects = [];

    try {
        for (let mObj of this.productData.ProductMultimediaObject) {
            let mObjectSet = [];

            mObjectSet.contentType = mObj.MultimediaObject[0]['$'].ContentType;
            mObjectSet.tumbUrl = mObj.MultimediaObject[0]['$'].ThumbUrl;
            mObjectSet.description = mObj.MultimediaObject[0]['$'].Description;
            mObjectSet.keepAsURL = mObj.MultimediaObject[0]['$'].KeepAsURL;
            mObjectSet.size = mObj.MultimediaObject[0]['$'].Size;
            mObjectSet.url = mObj.MultimediaObject[0]['$'].URL;

            MultimediaObjects.push(mObjectSet);
        }
    } catch (e) {
        return false;
    }

    return MultimediaObjects;
};

module.exports = icecat;