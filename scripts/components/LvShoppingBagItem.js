/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const LvShoppingBagItemDesign = require('library/LvShoppingBagItem');

const LvShoppingBagItem = extend(LvShoppingBagItemDesign)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || LvShoppingBagItemDesign.defaults);
    this.pageName = pageName;
  }

);

module && (module.exports = LvShoppingBagItem);