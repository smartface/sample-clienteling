/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const StepperDesign = require('library/Stepper');

const Stepper = extend(StepperDesign)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || StepperDesign.defaults);
    this.pageName = pageName;
  }

);

module && (module.exports = Stepper);