/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const LvCustomerProfileDesign = require('library/LvCustomerProfile');

const LvCustomerProfile = extend(LvCustomerProfileDesign)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || LvCustomerProfileDesign.defaults);
    this.pageName = pageName;
  }

);

module && (module.exports = LvCustomerProfile);