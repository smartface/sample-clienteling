const extend = require('js-base/core/extend');
const FlWardrobeDesign = require('library/FlWardrobe');

const FlWardrobe = extend(FlWardrobeDesign)(
  //constructor
  function(_super, opt) {
    opt = opt || {};
    // initalizes super class for this scope
    _super(this, {});

    this.name.text = opt.name;
    this.price.text = opt.price;
    this.image.loadFromUrl(opt.image);
    this.model.text = opt.model;
  }
);

module && (module.exports = FlWardrobe);
