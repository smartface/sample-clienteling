/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const TitleDesign = require('library/Title');

const Title = extend(TitleDesign)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || TitleDesign.defaults);
    this.pageName = pageName;
  }

);

module && (module.exports = Title);