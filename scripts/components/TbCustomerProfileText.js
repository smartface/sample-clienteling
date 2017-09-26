/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const TbCustomerProfileTextDesign = require('library/TbCustomerProfileText');

const TbCustomerProfileText = extend(TbCustomerProfileTextDesign)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || TbCustomerProfileTextDesign.defaults);
    this.pageName = pageName;
  }

);

module && (module.exports = TbCustomerProfileText);