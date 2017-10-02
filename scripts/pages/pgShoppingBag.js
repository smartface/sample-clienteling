const extend = require('js-base/core/extend');
const Router = require("sf-core/ui/router");
const System = require('sf-core/device/system');
const PgShoppingBagDesign = require('ui/ui_pgShoppingBag');

const PgShoppingBag = extend(PgShoppingBagDesign)(
  // Constructor
  function(_super) {
    _super(this);
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    this.flHeaderLeft.onTouchEnded = function() {
      Router.goBack();
    };
  });

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
  const page = this;
  superOnShow();

  if (System.OS === "iOS") {
    page.flStatusBarBg.height = page.statusBar.height;
  }
  else {
    page.layout.removeChild(page.flStatusBarBg);
  }
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
  superOnLoad();




  this.lvShoppingBag.itemCount = 5;
  this.lvShoppingBag.onRowBind = function(shoppingBagItem, index) {
    shoppingBagItem.productImage.loadFromUrl("https://smartfacecdn.blob.core.windows.net/apps/ecommerce/images/product/D56363.png");
  };
}

module && (module.exports = PgShoppingBag);
