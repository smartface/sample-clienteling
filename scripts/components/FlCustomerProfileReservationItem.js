/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const FlCustomerProfileReservationItemDesign = require('library/FlCustomerProfileReservationItem');

const FlCustomerProfileReservationItem = extend(FlCustomerProfileReservationItemDesign)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || FlCustomerProfileReservationItemDesign.defaults);
    this.pageName = pageName;
    
    this.children.lblDate.text = new Date(props.date).toLocaleDateString();
    this.children.lblInfo = props.type;
    this.children.lblStatus = props.status;
  }

);

module && (module.exports = FlCustomerProfileReservationItem);