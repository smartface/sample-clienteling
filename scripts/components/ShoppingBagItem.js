/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const ShoppingBagItemDesign = require('library/ShoppingBagItem');

const ShoppingBagItem = extend(ShoppingBagItemDesign)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || ShoppingBagItemDesign.defaults);
    this.pageName = pageName;
  }

);

module && (module.exports = ShoppingBagItem);