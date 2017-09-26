/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const LvDesign = require('library/Lv');

const Lv = extend(LvDesign)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || LvDesign.defaults);
    this.pageName = pageName;
  }

);

module && (module.exports = Lv);