/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const FlDashboardItem5Design = require('library/FlDashboardItem5');

const FlDashboardItem5 = extend(FlDashboardItem5Design)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || FlDashboardItem5Design.defaults);
    this.pageName = pageName;
  }

);

module && (module.exports = FlDashboardItem5);