/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const FlDashboardItem4Design = require('library/FlDashboardItem4');

const FlDashboardItem4 = extend(FlDashboardItem4Design)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || FlDashboardItem4Design.defaults);
    this.pageName = pageName;
  }

);

module && (module.exports = FlDashboardItem4);