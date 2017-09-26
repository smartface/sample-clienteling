/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const FlWardrobeDesign = require('library/FlWardrobe');

const FlWardrobe = extend(FlWardrobeDesign)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || FlWardrobeDesign.defaults);
    this.pageName = pageName;
  }

);

module && (module.exports = FlWardrobe);