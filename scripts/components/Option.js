/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const OptionDesign = require('library/Option');

const Option = extend(OptionDesign)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, Object.assign({}, OptionDesign.defaults, props));
    this.text = props.name;
    props.onTouch  && (this.onTouch = props.onTouch);
    this.pageName = pageName;
  }

);

module && (module.exports = Option);