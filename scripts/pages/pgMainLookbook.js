const extend = require('js-base/core/extend');
const PgMainLookbookDesign = require('ui/ui_pgMainLookbook');
const adjustHeaderBar = require("../lib/adjustHeaderBar");

const PgMainLookbook = extend(PgMainLookbookDesign)(
  function(_super, routeData, router) {
    _super(this);
    this._router = router;
    this._routeData = routeData;
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
  });

function onShow(superOnShow) {
  superOnShow();
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
