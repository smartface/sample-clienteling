/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const FlCustomerProfileReservationItemDesign = require('library/FlCustomerProfileReservationItem');

const FlCustomerProfileReservationItem = extend(FlCustomerProfileReservationItemDesign)(
  //constructor
  function(_super, props, opt) {
    // initalizes super class for this scope
    opt = opt || {};
    _super(this, props || FlCustomerProfileReservationItemDesign.defaults);

    this.children.lblDate.text = new Date(opt.date).toLocaleDateString();
    this.children.lblInfo.text = opt.type;
    this.children.lblStatus.text = opt.status;
  }

);

module && (module.exports = FlCustomerProfileReservationItem);