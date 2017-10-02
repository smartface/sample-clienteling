const extend = require('js-base/core/extend');
const PgMainLookbookDesign = require('ui/ui_pgMainLookbook');
const Router = require("sf-core/ui/router");
const System = require('sf-core/device/system');
const pageContextPatch = require("../context/pageContextPatch");

const PgMainLookbook = extend(PgMainLookbookDesign)(
  // Constructor
  function(_super) {
    _super(this);
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    this.flHeaderLeft.onTouchEnded = function() {
      Router.goBack();
    };
    this.flWomen.onTouchEnded = function() {
      Router.go("pgLookbook");
    };

    pageContextPatch(this, "pgMainLookbook");
  });

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} routeData - parameters passed from Router.go function
 */
function onShow(superOnShow, routeData) {
  const page = this;
  superOnShow();

  if (System.OS === "iOS") {
    page.flStatusBarBg.height = page.statusBar.height;
  }
  else {
    page.layout.removeChild(page.flStatusBarBg);
  }
}

module && (module.exports = PgMainLookbook);
