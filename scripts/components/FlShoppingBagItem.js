/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const FlShoppingBagItemDesign = require('library/FlShoppingBagItem');

const FlShoppingBagItem = extend(FlShoppingBagItemDesign)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || FlShoppingBagItemDesign.defaults);
    this.pageName = pageName;
  }

);

module && (module.exports = FlShoppingBagItem);