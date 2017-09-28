/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const FlDashboardItem2Design = require('library/FlDashboardItem2');

const FlDashboardItem2 = extend(FlDashboardItem2Design)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || FlDashboardItem2Design.defaults);
    this.pageName = pageName;
  }

);

module && (module.exports = FlDashboardItem2);