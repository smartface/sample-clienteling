/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const FlCustomerProfileWardrobeDesign = require('library/FlCustomerProfileWardrobe');

const FlCustomerProfileWardrobe = extend(FlCustomerProfileWardrobeDesign)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || FlCustomerProfileWardrobeDesign.defaults);
    this.pageName = pageName;
  }

);

module && (module.exports = FlCustomerProfileWardrobe);