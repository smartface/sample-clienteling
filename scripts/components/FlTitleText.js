/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const FlTitleTextDesign = require('library/FlTitleText');

const FlTitleText = extend(FlTitleTextDesign)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || FlTitleTextDesign.defaults);
    this.pageName = pageName;
  }

);

module && (module.exports = FlTitleText);