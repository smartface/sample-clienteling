/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const FlCustomerProfileNumTexyDesign = require('library/FlCustomerProfileNumTexy');

const FlCustomerProfileNumTexy = extend(FlCustomerProfileNumTexyDesign)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || FlCustomerProfileNumTexyDesign.defaults);
    this.pageName = pageName;
  }

);

module && (module.exports = FlCustomerProfileNumTexy);