const extend = require('js-base/core/extend');
const PgSignupTabletDesign = require('ui/ui_pgSignupTablet');
const pageContextPatch = require("../context/pageContextPatch");
const Router = require("sf-core/ui/router");
const PgSignupTablet = extend(PgSignupTabletDesign)(
  // Constructor
  function(_super) {
    // Initalizes super class for this page scope
    _super(this);
    // overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    this.btnSignup.onTouch = onTouch;
    pageContextPatch(this, "pgSignupTablet");
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

function onTouch() {
  Router.go("pgDashboard");
}

module && (module.exports = PgSignupTablet);
