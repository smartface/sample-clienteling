const extend = require('js-base/core/extend');
const FlWardrobeDesign = require('library/FlWardrobe');

const FlWardrobe = extend(FlWardrobeDesign)(
  //constructor
  function(_super, props, opt) {
    opt = opt || {};
    // initalizes super class for this scope
    _super(this, Object.assign({}, FlWardrobeDesign.defaults, props));
    this.name = opt.name;
    this.price = opt.price;
    this.image.loadFromUrl(opt.image);
    this.model = opt.model;
  }
);

module && (module.exports = FlWardrobe);
