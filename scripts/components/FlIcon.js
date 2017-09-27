/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const FlIconDesign = require('library/FlIcon');

const Image = require('sf-core/ui/image');

const FlIcon = extend(FlIconDesign)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, Object.assign({}, FlIconDesign.defaults, props));
    props.image && (this.image.image = Image.createFromFile("images://" + props.image));
    if(props.divider === false){
      this.children.divider.visible = false;
      this.children.divider1.visible = false;
    }
    this.pageName = pageName;
  }

);

module && (module.exports = FlIcon);
