const extend = require('js-base/core/extend');
const PgMainLookbookDesign = require('ui/ui_pgMainLookbook');
const Router = require("sf-core/ui/router");
const adjustHeaderBar = require("../lib/adjustHeaderBar");

const PgMainLookbook = extend(PgMainLookbookDesign)(
  // Constructor
  function(_super) {
    _super(this);
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    this.flHeaderLeft.onTouchEnded = function() {
      Router.goBack();
    };
    this.flWomen.onTouchEnded = function() {
      Router.go("pgLookbook");
    };
  });

function onShow(superOnShow) {
  superOnShow();
  Router.sliderDrawer.enabled = false;
}

function onLoad(superOnLoad) {
  const page = this;
  
  page.safeAreaLayoutMode = true;
  superOnLoad();
  adjustHeaderBar(page);
}

module && (module.exports = PgMainLookbook);
