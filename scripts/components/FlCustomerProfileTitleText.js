/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const FlCustomerProfileTitleTextDesign = require('library/FlCustomerProfileTitleText');

const FlCustomerProfileTitleText = extend(FlCustomerProfileTitleTextDesign)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || FlCustomerProfileTitleTextDesign.defaults);
    this.pageName = pageName;
  }

);

module && (module.exports = FlCustomerProfileTitleText);