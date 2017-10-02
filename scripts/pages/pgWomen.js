const extend = require('js-base/core/extend');
const PgWomenDesign = require('ui/ui_pgWomen');
const pageContextPatch = require("../context/pageContextPatch");
const SvipeViewTemplatePage = require("pages/pgWomenSwipePage");
const globalSvipeViewList = require("lib/swipeViewList");
const SwipeView = require("sf-core/ui/swipeview");

const flexProps = ["flexGrow", "flexDirection", "alignItems", "justifyContent"];

const PgWomen = extend(PgWomenDesign)(
  // Constructor
  function(_super) {
    // Initalizes super class for this page scope
    _super(this);
    // overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    
    this.subscribeContext = function(e){
      if(e.type == "new-styles"){
        Object.keys(e.data).forEach(function(key){
          if(flexProps.some(function(prop){ return  prop == key})){
            this.layout[key] = e.data[key];
          } else {
            this[key] = e.data[key];
          }
        }.bind(this));
      }
    };

    pageContextPatch(this, "pgWomen");
    loadUI.call(this);
  });

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
  superOnShow();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
  superOnLoad();
}


function loadUI(){
  const json = require("../sample-data/customerProfile.json");
  var list  = json.wishlist;
  globalSvipeViewList.setList(list);
  this.flSwipe.removeAll();
  var swipeView = new SwipeView({
        page: this,
        flexGrow: 1,
        pages: [SvipeViewTemplatePage, SvipeViewTemplatePage, SvipeViewTemplatePage, SvipeViewTemplatePage],
        onPageSelected: onChildPageChanged.bind(this)
  });
  this.flSwipe.addChild(swipeView);

}

function onChildPageChanged(index) {
  globalSvipeViewList.setActiveIndex(index);
  //this.dotIndicator.currentIndex = index;
}

module && (module.exports = PgWomen);
