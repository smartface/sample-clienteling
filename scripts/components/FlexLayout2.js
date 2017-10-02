/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const FlexLayout2Design = require('library/FlexLayout2');

const FlexLayout2 = extend(FlexLayout2Design)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || FlexLayout2Design.defaults);
    this.pageName = pageName;
  }

);

module && (module.exports = FlexLayout2);