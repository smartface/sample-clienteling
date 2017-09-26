/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const FlNumTextDesign = require('library/FlNumText');

const FlNumText = extend(FlNumTextDesign)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || FlNumTextDesign.defaults);
    this.pageName = pageName;
  }

);

module && (module.exports = FlNumText);