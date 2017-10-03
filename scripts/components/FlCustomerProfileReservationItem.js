const extend = require('js-base/core/extend');
const FlCustomerProfileReservationItemDesign = require('library/FlCustomerProfileReservationItem');

const FlCustomerProfileReservationItem = extend(FlCustomerProfileReservationItemDesign)(
  //constructor
  function(_super, props, opt) {
    opt = opt || {};
    _super(this, props || FlCustomerProfileReservationItemDesign.defaults);

    this.children.lblDate.text = new Date(opt.date).toLocaleDateString();
    this.children.lblInfo.text = opt.name || opt.type;
    this.children.lblStatus.text = opt.status;
  }
);

module && (module.exports = FlCustomerProfileReservationItem);
