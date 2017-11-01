/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const FlDashboardItem1Design = require('library/FlDashboardItem1');

const FlDashboardItem1 = extend(FlDashboardItem1Design)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || {});
    this.pageName = pageName;
  }
);

module && (module.exports = FlDashboardItem1);
