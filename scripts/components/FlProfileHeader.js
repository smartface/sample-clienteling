/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const FlProfileHeaderDesign = require('library/FlProfileHeader');

const FlProfileHeader = extend(FlProfileHeaderDesign)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || FlProfileHeaderDesign.defaults);
    this.pageName = pageName;
  }

);

module && (module.exports = FlProfileHeader);