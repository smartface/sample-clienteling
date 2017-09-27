/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const Color = require('sf-core/ui/color');

const SliderDrawerDesign = require('library/SliderDrawer');
const FlIcon = require('components/FlIcon');
const Option = require('components/Option');

var activeCategoryColor = Color.create("#5193E2"),
  activeOptionColor = Color.create("#1d1d1d");

const SliderDrawer = extend(SliderDrawerDesign)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, Object.assign({}, SliderDrawerDesign.defaults, props));
    this.pageName = pageName;
    this._activeOption = 1;
    this._activeCategory = 1;
    this.flIcons.addChild(new FlIcon({ id: 1, image: "profile.png", onTouch: onTouchCategory.bind(this, 1) }));
    this.flIcons.addChild(new FlIcon({ id: 2, image: "hr_icon.png", onTouch: onTouchCategory.bind(this, 2) }));
    this.flIcons.addChild(new FlIcon({ id: 3, image: "approvals.png", onTouch: onTouchCategory.bind(this, 3) }));
    this.flIcons.addChild(new FlIcon({ id: 4, image: "home.png", onTouch: onTouchCategory.bind(this, 4) }));
    this.flIcons.addChild(new FlIcon({ id: 5, image: "settings.png", divider: false, onTouch: onTouchCategory.bind(this, 5) }));

    this.flButtons.addChild(new Option({ id: 1, name: "    Profile", backgroundColor: activeOptionColor, onTouch: onTouchOption.bind(this, 1) }));
    this.flButtons.addChild(new Option({ id: 2, name: "    Overview", onTouch: onTouchOption.bind(this, 2) }));
    this.flButtons.addChild(new Option({ id: 3, name: "    Salary", onTouch: onTouchOption.bind(this, 3) }));
    this.flButtons.addChild(new Option({ id: 4, name: "    Employment History", onTouch: onTouchOption.bind(this, 4) }));
    this.flButtons.addChild(new Option({ id: 5, name: "    Performance", onTouch: onTouchOption.bind(this, 5) }));
  }

);

function onTouchOption(id) {
  this.flButtons.findChildById(id).backgroundColor = activeOptionColor
  this.flButtons.findChildById(this._activeOption).backgroundColor = Color.TRANSPARENT;
  this._activeOption = id;
}

function onTouchCategory(id) {
  this.flIcons.findChildById(id).icon.backgroundColor = activeCategoryColor
  this.flIcons.findChildById(this._activeCategory).icon.backgroundColor = Color.TRANSPARENT;
  this._activeCategory = id;
}



module && (module.exports = SliderDrawer);
