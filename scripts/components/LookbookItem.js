/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const LookbookItemDesign = require('library/LookbookItem');

const LookbookItem = extend(LookbookItemDesign)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || LookbookItemDesign.defaults);
    this.pageName = pageName;
  }

);

module && (module.exports = LookbookItem);