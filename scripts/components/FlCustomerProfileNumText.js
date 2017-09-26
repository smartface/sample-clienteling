/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const FlCustomerProfileNumTextDesign = require('library/FlCustomerProfileNumText');

const FlCustomerProfileNumText = extend(FlCustomerProfileNumTextDesign)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || FlCustomerProfileNumTextDesign.defaults);
    this.pageName = pageName;
  }

);

module && (module.exports = FlCustomerProfileNumText);