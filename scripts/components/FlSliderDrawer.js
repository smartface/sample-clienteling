/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const FlSliderDrawerDesign = require('library/FlSliderDrawer');

const FlSliderDrawer = extend(FlSliderDrawerDesign)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || FlSliderDrawerDesign.defaults);
    this.pageName = pageName;
  }

);

module && (module.exports = FlSliderDrawer);