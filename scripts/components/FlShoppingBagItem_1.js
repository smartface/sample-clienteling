/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const FlShoppingBagItem_1Design = require('library/FlShoppingBagItem_1');

const FlShoppingBagItem_1 = extend(FlShoppingBagItem_1Design)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || FlShoppingBagItem_1Design.defaults);
    this.pageName = pageName;
  }

);

module && (module.exports = FlShoppingBagItem_1);