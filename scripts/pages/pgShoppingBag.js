const extend = require('js-base/core/extend');
const Router = require("sf-core/ui/router");
const PgShoppingBagDesign = require('ui/ui_pgShoppingBag');
const Color = require("sf-core/ui/color");
const pageContextPatch = require("../context/pageContextPatch");
const adjustHeaderBar = require("../lib/adjustHeaderBar");

const TRANSPARENT_GRAY = Color.create(15, 125, 125, 125);
const PgShoppingBag = extend(PgShoppingBagDesign)(
  // Constructor
  function(_super) {
    _super(this);
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    this.onOrientationChange = onOrientationChange.bind(this);

    this.flHeaderLeft.onTouchEnded = function() {
      Router.goBack();
    };
    //pageContextPatch(this, "pgShoppingBag");

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
  const page = this;
  superOnLoad();
  adjustHeaderBar(page);
  this.lvShoppingBag.itemCount = 5;
  this.lvShoppingBag.refreshEnabled = false;
  this.lvShoppingBag.onRowBind = function(shoppingBagItem, index) {
    (shoppingBagItem.backgroundColor = (index % 2 === 0) ? TRANSPARENT_GRAY : Color.TRANSPARENT);
    shoppingBagItem.productImage.loadFromUrl("https://smartfacecdn.blob.core.windows.net/apps/ecommerce/images/product/D56363.png");
  };
}


function onOrientationChange() {
  this.lvShoppingBag.refreshData();
  this.lvShoppingBag.stopRefresh();
}

module && (module.exports = PgShoppingBag);
