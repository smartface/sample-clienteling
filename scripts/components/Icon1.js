/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const Icon1Design = require('library/Icon1');

const Icon1 = extend(Icon1Design)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || Icon1Design.defaults);
    this.pageName = pageName;
  }

);

module && (module.exports = Icon1);