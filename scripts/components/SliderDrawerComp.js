/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const Color = require('sf-core/ui/color');

const SliderDrawerCompDesign = require('library/SliderDrawerComp');
const FlIcon = require('components/FlIcon');
const Option = require('components/Option');
const componentContextPatch = require("@smartface/contx/lib/smartface/componentContextPatch");

var activeCategoryColor = Color.create("#5193E2"),
    activeOptionColor = Color.create("#1d1d1d");
  
function addChild(childName, child) {
    this.children = this.children || {};
    this.children[childName] = child;
    if (this.layout)
        this.layout.addChild(this.children[childName]);
    else
        this.addChild(this.children[childName]);
}

const SliderDrawerComp = extend(SliderDrawerCompDesign)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props);
    this.pageName = pageName;
    this._activeOption = 1;
    this._activeCategory = 1;
    
    addChild.call(this.flIcons, "icon1", new FlIcon({
      id: 1,
      image: "profile.png",
      onTouch: onTouchCategory.bind(this, 1)
    }, {
      activeColor: activeCategoryColor
    }));
    
    addChild.call(this.flIcons, "icon2", new FlIcon({
      id: 2,
      image: "hr_icon.png",
      onTouch: onTouchCategory.bind(this, 2)
    }));
    
    addChild.call(this.flIcons, 'icon3', new FlIcon({
      id: 3,
      image: "approvals.png",
      onTouch: onTouchCategory.bind(this, 3)
    }));
    
    addChild.call(this.flIcons, 'icon4', new FlIcon({
      id: 4,
      image: "home.png",
      onTouch: onTouchCategory.bind(this, 4)
    }));
    
    addChild.call(this.flIcons, 'icon5', new FlIcon({
      id: 5,
      image: "settings.png",
      onTouch: onTouchCategory.bind(this, 5)
    }, {
      divider: false
    }));
    this.header.text = "    Profile";
    addChild.call(this.flButtons, "button1", new Option({ id: 1, name: "     Overview", onTouch: onTouchOption.bind(this, 1) }));
    addChild.call(this.flButtons, "button2", new Option({ id: 2, name: "     Salary", onTouch: onTouchOption.bind(this, 2) }));
    addChild.call(this.flButtons, "button3", new Option({ id: 3, name: "     Employment History", onTouch: onTouchOption.bind(this, 3) }));
    addChild.call(this.flButtons, "button4", new Option({ id: 4, name: "     Performance", onTouch: onTouchOption.bind(this, 4) }));
    
    componentContextPatch(this, "sliderDrawer");
    onTouchCategory.call(this,1);
  }
);

function onTouchOption(id) {
  this.flButtons.findChildById(id).backgroundColor = activeOptionColor;
  (this._activeOption !== id) && (this.flButtons.findChildById(this._activeOption).backgroundColor = Color.TRANSPARENT);
  this._activeOption = id;
}

function onTouchCategory(id) {
  this.flIcons.findChildById(id).icon.backgroundColor = activeCategoryColor;
  (this._activeCategory !== id) && (this.flIcons.findChildById(this._activeCategory).icon.backgroundColor = Color.TRANSPARENT);
  this._activeCategory = id;
}

module && (module.exports = SliderDrawerComp);
