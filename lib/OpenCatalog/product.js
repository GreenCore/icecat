'use strict';

/**
 *
 * @param {Object} jsonData
 * @param {string} jsonData[].Product
 * @param {string} xmlData
 * @param {string} requestUrl
 */
const icecat = function(jsonData, xmlData, requestUrl) {
  this.xmlData = xmlData;
  this.jsonData = jsonData;
  this.productData = jsonData['ICECAT-interface'].Product[0];
  this.requestUrl = requestUrl;
  this.returnCode = {
    FAIL: -1,
    SUCCESS: 1
  };
};

/**
 * getJSON
 * @returns {string}
 */
icecat.prototype.getJSON = function() {
  return this.jsonData;
};

/**
 * getXML
 * @returns {string}
 */
icecat.prototype.getXML = function() {
  return this.xmlData;
};

/**
 * getReturnCode
 * Example  returns -1 || 1
 * @returns {String}
 */
icecat.prototype.getReturnCode = function() {
  return parseInt(this.productData.$.Code, 10);
};

/**
 * getErrorMessage
 * @returns {string}
 */
icecat.prototype.getErrorMessage = function() {
  return this.productData.$.ErrorMessage;
};

/**
 * getName
 *
 * @returns Product Name {string}
 */
icecat.prototype.getName = function() {
  return this.productData.$.Name;
};

/**
 * getTitle
 *
 * @returns Product Title {string}
 */
icecat.prototype.getTitle = function() {
  return this.productData.$.Title;
};

/**
 * getReleaseDate
 *
 * @returns Product Release Date YYYY-MM-DD {string}
 */
icecat.prototype.getReleaseDate = function() {
  return this.productData.$.ReleaseDate;
};

/**
 * getLongDescription
 * @returns {string}
 */
icecat.prototype.getLongDescription = function() {
  try {
    return this.productData.ProductDescription[0].$.LongDesc;
  } catch (e) {
    return false;
  }
};

/**
 * getShortDescription
 * @returns {string}
 */
icecat.prototype.getShortDescription = function() {
  try {
    return this.productData.ProductDescription[0].$.ShortDesc;
  } catch (e) {
    return false;
  }
};

/**
 * getProductInfoPDFurl
 * @returns {string}
 */
icecat.prototype.getProductInfoPDFurl = function() {
  try {
    return this.productData.ProductDescription[0].$.PDFURL;
  } catch (e) {
    return false;
  }
};

/**
 * getProductManualPDFurl
 * @returns {string}
 */
icecat.prototype.getProductManualPDFurl = function() {
  try {
    return this.productData.ProductDescription[0].$.ManualPDFURL;
  } catch (e) {
    return false;
  }
};

/**
 * getProductUrl
 * @returns {string}
 */
icecat.prototype.getProductUrl = function() {
  try {
    return this.productData.ProductDescription[0].$.URL;
  } catch (e) {
    return false;
  }
};

/**
 * getSupplier
 * @returns {string}
 */
icecat.prototype.getSupplier = function() {
  return this.productData.Supplier[0].$.Name;
};

/**
 * getCategory
 * @returns {string}
 */
icecat.prototype.getCategory = function() {
  return this.productData.Category[0].Name[0].$.Value;
};

/**
 * getFamily
 * @returns {Object}
 */
icecat.prototype.getFamily = function() {
  try {
    return {
      id: this.productData.ProductFamily[0].Name[0].$.ID,
      name: this.productData.ProductFamily[0].Name[0].$.Value
    };
  } catch (e) {
    return false;
  }
};

/**
 * getID
 * @returns {string}
 */
icecat.prototype.getID = function() {
  return this.productData.$.ID;
};

/**
 * getEan
 * @returns {string}
 */
icecat.prototype.getEan = function() {
  return this.productData.EANCode[0].$.EAN;
};

/**
 * getImages
 * @returns {array}
 */
icecat.prototype.getImages = function() {
  if (!this.productData.ProductGallery.length || !this.productData.ProductGallery[0].ProductPicture.length) {
    return;
  }
  return this.productData.ProductGallery[0].ProductPicture.map((img) => {
    return {
      IsMain: img.$.IsMain,
      HighImg: img.$.Pic,
      LowImg: img.$.LowPic,
      ThumbImg: img.$.ThumbPic
    };
  });
};

/**
 * getSpecifications
 * @returns {array}
 */
icecat.prototype.getSpecifications = function() {
  return this.productData.ProductFeature.map((pSpec) => {
    const $ = pSpec.$;

    return {
      name: pSpec.Feature[0].Name[0].$.Value,
      presentationValue: $.Presentation_Value,
      value: $.Value,
      specId: $.CategoryFeature_ID,
      specGroupId: $.CategoryFeatureGroup_ID
    };
  });
};

/**
 * getMultimediaObjects
 * @returns {Array}
 */
icecat.prototype.getMultimediaObjects = function() {
  try {
    return this.productData.ProductMultimediaObject.map((mObj) => {
      const mmObj = mObj.MultimediaObject[0].$;
      return {
        contentType: mmObj.ContentType,
        thumbPic: mmObj.ThumbPic,
        description: mmObj.Description,
        keepAsURL: mmObj.KeepAsURL,
        size: mmObj.Size,
        url: mmObj.URL
      };
    });
  } catch (e) {
    return false;
  }
};

/**
 * getCategoryFeatureGroups
 * @returns {Array}
 */
icecat.prototype.getCategoryFeatureGroups = function() {
  try {
    return this.productData.CategoryFeatureGroup.map((cfgObj) => {
      const item = cfgObj.FeatureGroup[0].$;
      return {
        id: cfgObj.$.ID,
        name: cfgObj.FeatureGroup[0].Name[0].$.Value
      };
    });
  } catch (e) {
    return false;
  }
};

module.exports = icecat;
