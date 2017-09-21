/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const LviLookbookItemDesign = require('library/LviLookbookItem');

const LviLookbookItem = extend(LviLookbookItemDesign)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || LviLookbookItemDesign.defaults);
    this.pageName = pageName;
  }

);

module && (module.exports = LviLookbookItem);