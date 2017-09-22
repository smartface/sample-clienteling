const extend = require('js-base/core/extend');


module.exports = function buildPage(view){
  return extend(view)(ContextPage);
}

function ContextPageMixin(_super){
  _super.apply(this, Array.prototype.slice(arguments, 1));
  this.addChild = this.addChild.bind(this, this.addChild);
}

function addChild(superAddChild, child){
  this.superAddChild(child);
}
