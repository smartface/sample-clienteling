const extend = require('js-base/core/extend');
const PgDashboardDesign = require('ui/ui_pgDashboard');
const System = require('sf-core/device/system');
const Router = require("sf-core/ui/router");
const pageContextPatch = require("../context/pageContextPatch");

const PgDashboard = extend(PgDashboardDesign)(
  // Constructor
  function(_super) {
    // Initalizes super class for this page scope
    _super(this);
    // overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    pageContextPatch(this, "pgDashboard");
  });

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
  superOnShow();
  const page = this;

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
  const page = this;
  page.imgSignOut.onTouchEnded = function() {
    Router.goBack("pgLogin");
  };
  page.svInfo.scrollBarEnabled = false;
  page.svInfo.layout.height = 90;
  page.svInfo.layout.minWidth = 768;
}

module && (module.exports = PgDashboard);
