/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const LvCustomerProfileRecentItemDesign = require('library/LvCustomerProfileRecentItem');

const LvCustomerProfileRecentItem = extend(LvCustomerProfileRecentItemDesign)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || LvCustomerProfileRecentItemDesign.defaults);
    this.pageName = pageName;
  }

);

module && (module.exports = LvCustomerProfileRecentItem);