/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const FlCustomerProfileProfileHeaderDesign = require('library/FlCustomerProfileProfileHeader');

const FlCustomerProfileProfileHeader = extend(FlCustomerProfileProfileHeaderDesign)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || FlCustomerProfileProfileHeaderDesign.defaults);
    this.pageName = pageName;
  }

);

module && (module.exports = FlCustomerProfileProfileHeader);