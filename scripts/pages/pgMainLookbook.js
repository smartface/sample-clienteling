const extend = require('js-base/core/extend');
const PgMainLookbookDesign = require('ui/ui_pgMainLookbook');
const pageContextPatch = require("../context/pageContextPatch");

const PgMainLookbook = extend(PgMainLookbookDesign)(
  // Constructor
  function(_super) {
    // Initalizes super class for this page scope
    _super(this);
    
    // overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    this.onHide = onHide.bind(this);
    
    pageContextPatch(this, "pgMainLookbook");
  });
  
/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} routeData - parameters passed from Router.go function
 */
function onShow(superOnShow, routeData) {
  superOnShow();
}

function onHide(superOnHide) {
  superOnHide();
}

PgMainLookbook.$subcribe = ["employee.dahsboard", "mcs.login", "page"];

module && (module.exports = PgMainLookbook);
