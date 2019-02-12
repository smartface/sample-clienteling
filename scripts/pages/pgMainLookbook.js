const extend = require('js-base/core/extend');
const PgMainLookbookDesign = require('ui/ui_pgMainLookbook');
//const Router = require("sf-core/ui/router");
const adjustHeaderBar = require("../lib/adjustHeaderBar");

const PgMainLookbook = extend(PgMainLookbookDesign)(
  // Constructor
  function(_super, routeData, router) {
    _super(this);
    this._router = router;
    this._routeData = routeData;
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
  });

function onShow(superOnShow) {
  superOnShow();
  //Router.sliderDrawer.enabled = false;
}

function onLoad(superOnLoad) {
  const page = this;
  superOnLoad();
  adjustHeaderBar(page);
  page.flHeaderLeft.onTouchEnded = function() {
      page._router.goBack();
  };
  page.flWomen.onTouchEnded = function() {
      page._router.push("/pages/pgLookbook");
  };
}

module.exports = PgMainLookbook;
