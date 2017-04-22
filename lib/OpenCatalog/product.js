'use strict';

/**
 *
 * @param jsonData
 */
const icecat = function (jsonData, xmlData, requestUrl) {
    this.xmlData = xmlData;
    this.jsonData = jsonData;
    this.productData = jsonData['ICECAT-interface'].Product[0];
    this.requestUrl = requestUrl;
    this.returnCode = {
        FAIL : -1,
        SUCCESS : 1
    }
};

/**
 * getJSON
 * @returns {string}
 */
icecat.prototype.getJSON = function () {
    return this.jsonData;
}

/**
 * getXML
 * @returns {string}
 */
icecat.prototype.getXML = function () {
    return this.xmlData;
}

/**
 * getReturnCode
 * Example  returns -1 || 1
 * @returns {string}
 */
icecat.prototype.getReturnCode = function () {
    return this.productData['$'].Code;
}

/**
 * getName
 *
 * @returns Product Name {string}
 */
icecat.prototype.getName = function () {
    return this.productData['$'].Name;
}

/**
 * getTitle
 *
 * @returns Product Title {string}
 */
icecat.prototype.getTitle = function () {
    return this.productData['$'].Title;
}

/**
 * getReleaseDate
 *
 * @returns Product Release Date YYYY-MM-DD {string}
 */
icecat.prototype.getReleaseDate = function () {
    return this.productData['$'].ReleaseDate;
}

/**
 * getLongDescription
 * @returns {string}
 */
icecat.prototype.getLongDescription = function () {
    try {
        return this.productData.ProductDescription[0]['$'].LongDesc;
    } catch(e) {
        return false;
    }
}

/**
 * getShortDescription
 * @returns {string}
 */
icecat.prototype.getShortDescription = function () {
    try {
        return this.productData.ProductDescription[0]['$'].ShortDesc;
    } catch(e) {
        return false;
    }
}

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
}

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
}

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
}

/**
 * getSupplier
 * @returns {string}
 */
icecat.prototype.getSupplier = function () {
    return this.productData.Supplier[0]['$'].Name;
}

/**
 * getCategory
 * @returns {string}
 */
icecat.prototype.getCategory = function () {
    return this.productData.Category[0].Name[0]['$'].Value;
}

/**
 * getEan
 * @returns {string}
 */
icecat.prototype.getEan = function () {
    return this.productData.EANCode[0]['$'].EAN;
}

/**
 * getImages
 * @returns {array}
 */
icecat.prototype.getImages = function () {
    var images = [];

    for (let img of this.productData.ProductGallery[0].ProductPicture) {
        var imageSet = {};
        imageSet.IsMain = img['$']['IsMain'];

        imageSet.HighImg = img['$']['Pic'];
        imageSet.LowImg = img['$']['LowPic'];
        imageSet.TumbImg = img['$']['ThumbPic'];

        images.push(imageSet);
    }

    return images;
}

/**
 * getSpecifications
 * @returns {array}
 */
icecat.prototype.getSpecifications = function () {
    let ProductFeatures = [];

    for (let pSpec of this.productData.ProductFeature) {
        var specSet = {};

        specSet.name = pSpec.Feature[0].Name[0]['$'].Value
        specSet.value = pSpec['$'].Presentation_Value;
        specSet.specId = pSpec['$'].CategoryFeature_ID;
        specSet.specGroupId = pSpec['$'].CategoryFeatureGroup_ID;

        ProductFeatures.push(specSet);
    }

    return ProductFeatures;
}

/**
 * getMultimediaObjects
 * @returns {Array}
 */
icecat.prototype.getMultimediaObjects = function () {
    var MultimediaObjects = [];

    try {
        for (let mObj of this.productData.ProductMultimediaObject) {
            var mObjectSet = [];

            mObjectSet.contentType = mObj.MultimediaObject[0]['$'].ContentType;
            mObjectSet.tumbUrl = mObj.MultimediaObject[0]['$'].ThumbUrl;
            mObjectSet.description = mObj.MultimediaObject[0]['$'].Description;
            mObjectSet.keepAsURL = mObj.MultimediaObject[0]['$'].KeepAsURL;
            mObjectSet.size = mObj.MultimediaObject[0]['$'].Size;
            mObjectSet.url = mObj.MultimediaObject[0]['$'].URL;

            MultimediaObjects.push(mObjectSet);
        }
    } catch(e) {
        return false;
    }

    return MultimediaObjects;
}

module.exports = icecat;