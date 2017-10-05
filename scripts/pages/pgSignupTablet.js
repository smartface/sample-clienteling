const extend = require('js-base/core/extend');
const PgSignupTabletDesign = require('ui/ui_pgSignupTablet');
const pageContextPatch = require("../context/pageContextPatch");
const Router = require("sf-core/ui/router");
const fingerprint = require("sf-extension-utils").fingerprint;
const authService = require("../service/AuthService");
const adjustHeaderBar = require("../lib/adjustHeaderBar");
const System = require('sf-core/device/system');

const PgSignupTablet = extend(PgSignupTabletDesign)(
  // Constructor
  function(_super) {
    _super(this);
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    this.btnSignup.onPress = onPressSignup.bind(this);
    this.btnAnonymous.onPress = onPressAnonymous;
    this.btnFacebook.onPress = onPressFacebook;
    this.taUserID.ios &&  (this.taUserID.ios.clearButtonEnabled = true);
    this.taPassword.ios &&  (this.taPassword.ios.clearButtonEnabled = true);
    pageContextPatch(this, "pgSignupTablet");
  });

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow, data) {
  const page = this;
  superOnShow();
  data = data || {};
  Router.sliderDrawer.enabled = false;
  data.appStart && fingerprint.init({
    userNameTextBox: page.taUserID,
    passwordTextBox: page.taPassword,
    autoLogin: false, //TODO: set true after clearing static login values from textboxes
    callback: function(err, fingerprintResult) {
      var password;
      if (err)
        password = page.taUserID.text;
      else
        password = fingerprintResult.password;
      if (!password)
        return alert("password is required");
      loginWithUserNameAndPassword(page.taUserID.text, password, function(err) {
        if (err)
          return alert("Cannot login. Check user name and password. Or system is down");
        fingerprintResult && fingerprintResult.success(); //Important!
        Router.go('pgDashboard', {
          //some data
        });
      });
    }
  });
}

function onLoad(superOnLoad) {
  const page = this;
  superOnLoad();
  adjustHeaderBar(page);
}

function onPressSignup() {
  const page = this;
  if (!page.taUserID.text) {
    return alert("Username should not be empty");
  }
  // TODO: Remove workaround
  if (System.OS === "Android") {
    return Router.go("pgDashboard");
  }
  fingerprint.loginWithFingerprint();
}

function onPressAnonymous() {}

function onPressFacebook() {}

function loginWithUserNameAndPassword(username, password, callback) {
  authService.login().then(() => {
    callback();
  }).catch((err) => {
    if (err) {
      err = JSON.stringify(err);
    }
    else
      err = "unknown";
    console.log(`login error! Reason: ${err}`);
    callback(err);
  });
}

module && (module.exports = PgSignupTablet);
