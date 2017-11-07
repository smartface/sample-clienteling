/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const FlIconDesign = require('library/FlIcon');
const Image = require('sf-core/ui/image');

const FlIcon = extend(FlIconDesign)(
  //constructor
  function(_super, props, _opt) {
    // initalizes super class for this scope
    var opt = _opt || {};
    
    _super(this, props);

    this.onLoad = function(){
      alert("onload");
    };
    
    if(opt.divider === false){
      this.children.divider.visible = false;
      this.children.divider1.visible = false;
    }
    
    if(opt.activeColor){
      this.icon.backgroundColor = opt.activeColor;
    }
    
    this.pageName = opt.pageName;
    props.image && (this.image.image = Image.createFromFile("images://" + props.image));
  }, function(proto){
    proto.onLoad = function(){
      alert("onload");
    }
  }
);

module && (module.exports = FlIcon);
