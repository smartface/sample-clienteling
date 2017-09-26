/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const LvCustomerProfileWishlistItemDesign = require('library/LvCustomerProfileWishlistItem');

const LvCustomerProfileWishlistItem = extend(LvCustomerProfileWishlistItemDesign)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || LvCustomerProfileWishlistItemDesign.defaults);
    this.pageName = pageName;
  }

);

module && (module.exports = LvCustomerProfileWishlistItem);