/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const PgSignupPhoneDesign = require('ui/ui_pgSignupPhone');
const pageContext = require("../context/pageContext");

const PgSignupPhone = extend(PgSignupPhoneDesign)(
  // Constructor
  function(_super) {
    // Initalizes super class for this page scope
    _super(this);
    // overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    this.onOrientationChange = onOrientationChange.bind(this);

    this.classMap = {};
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
  superOnLoad();

  this.setContextDispatcher = setContextDispatcher.bind(this);
  this.styleContext = pageContext.createContext(
    this,
    "pgSignupPhone",
    null,
    function reducers(state, actors, action, target) {
      return state;
    });
}

function onOrientationChange() {
  setTimeout(function() {
    this.dispatch({
      type: "invalidate"
    });

    this.layout.applyLayout();
  }.bind(this), 50);
}

function setContextDispatcher(dispatcher) {
  this.dispatch = dispatcher;
}

module && (module.exports = PgSignupPhone);
