/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const FlCustomerProfileMostLikedColorsDesign = require('library/FlCustomerProfileMostLikedColors');

const FlCustomerProfileMostLikedColors = extend(FlCustomerProfileMostLikedColorsDesign)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || FlCustomerProfileMostLikedColorsDesign.defaults);
    this.pageName = pageName;
  }

);

module && (module.exports = FlCustomerProfileMostLikedColors);