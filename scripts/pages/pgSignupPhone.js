/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const PgSignupPhoneDesign = require('ui/ui_pgSignupPhone');
const pageContext = require("../context/pageContext");
const pageContextPatch = require("../context/pageContextPatch");

const PgSignupPhone = extend(PgSignupPhoneDesign)(
  // Constructor
  function(_super) {
    // Initalizes super class for this page scope
    _super(this);
    // overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    pageContextPatch(this, "pgSignupPhone")
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

module && (module.exports = PgSignupPhone);
