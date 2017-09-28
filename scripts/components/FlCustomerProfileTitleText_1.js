/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const FlCustomerProfileTitleText_1Design = require('library/FlCustomerProfileTitleText_1');

const FlCustomerProfileTitleText_1 = extend(FlCustomerProfileTitleText_1Design)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || FlCustomerProfileTitleText_1Design.defaults);
    this.pageName = pageName;
  }

);

module && (module.exports = FlCustomerProfileTitleText_1);