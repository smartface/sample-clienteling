/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const FlDashboardItem3Design = require('library/FlDashboardItem3');

const FlDashboardItem3 = extend(FlDashboardItem3Design)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || FlDashboardItem3Design.defaults);
    this.pageName = pageName;
  }

);

module && (module.exports = FlDashboardItem3);