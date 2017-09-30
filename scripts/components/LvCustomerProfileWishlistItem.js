/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const LvCustomerProfileWishlistItemDesign = require('library/LvCustomerProfileWishlistItem');

const LvCustomerProfileWishlistItem = extend(LvCustomerProfileWishlistItemDesign)(
  //constructor
  function(_super, props, opt) {
    // initalizes super class for this scope
    opt = opt || {};
    _super(this, props || LvCustomerProfileWishlistItemDesign.defaults);
    this.name.text = opt.name;
    this.price.text = opt.price;
    this.image.loadFromUrl(opt.image);
    this.model.text = opt.model;
  }

);

module && (module.exports = LvCustomerProfileWishlistItem);