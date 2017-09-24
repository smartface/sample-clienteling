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

    this.classMap = {
      "pgSignup1_flMain": ".flexLayout .flexLayout-default .flexLayout.signup.main-phone",
      "pgSignup1_flMain_flInfo_flUserID": ".flexLayout .flexLayout-default .flexLayout-margin",
      "pgSignup1_flMain_flInfo_flUserID_lblUserID": ".label .label-header",
      "pgSignup1_flMain_flInfo_flUserID_flLine": ".flexLayout .flexLayout-default .flexLayout-line",
      "pgSignup1_flMain_flInfo_flPassword": ".flexLayout .flexLayout-default .flexLayout-margin",
      "pgSignup1_flMain_flInfo_flPassword_lblPassword": ".label .label-header",
      "pgSignup1_flMain_flInfo_flPassword_flLine": ".flexLayout .flexLayout-default .flexLayout-line",
      "pgSignup1_flMain_flInfo_flButtons_flSignup_btnSignup": ".button .button.signup",
      "pgSignup1_flMain_flInfo_flButtons_flOther_btnFacebook": ".button .button.signup.fb",
      "pgSignup1_flMain_flInfo_flButtons_flOther_btnAnonymous": ".button .button.signup.anonymous"
    };
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
    "pgSignup1",
    function initialClassNames(name) {
      console.log(name);
      return this.classMap[name] || "";
    }.bind(this),
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
