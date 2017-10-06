/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const FlDashboardItem4_1Design = require('library/FlDashboardItem4_1');

const FlDashboardItem4_1 = extend(FlDashboardItem4_1Design)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || FlDashboardItem4_1Design.defaults);
    this.pageName = pageName;
  }

);

module && (module.exports = FlDashboardItem4_1);