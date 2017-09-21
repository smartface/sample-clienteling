/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const LviShoppingBagItemDesign = require('library/LviShoppingBagItem');

const LviShoppingBagItem = extend(LviShoppingBagItemDesign)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || LviShoppingBagItemDesign.defaults);
    this.pageName = pageName;
  }

);

module && (module.exports = LviShoppingBagItem);