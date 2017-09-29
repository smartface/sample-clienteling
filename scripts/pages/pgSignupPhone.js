const extend = require('js-base/core/extend');
const PgSignupPhoneDesign = require('ui/ui_pgSignupPhone');
const pageContextPatch = require("../context/pageContextPatch");
const Router = require("sf-core/ui/router");
const fingerprint = require("sf-extension-utils").fingerprint;
const authService = require("../service/AuthService")
const PgSignupPhone = extend(PgSignupPhoneDesign)(
  // Constructor
  function(_super) {
    // Initalizes super class for this page scope
    _super(this);
    // overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));

    this.btnSignup.onPress = onTouchSignup.bind(this);
    this.btnAnonymous.onPress = onTouchAnonymous;
    this.btnFacebook.onPress = onTouchFacebook;
    this.imgBanner.onTouchEnded = function() {
      Router.go("pgCustomerProfile");
    };

    pageContextPatch(this, "pgSignupPhone");
  });

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow, data) {
  superOnShow();
  const page = this;
  data = data || {};
  data.appStart && fingerprint.init({
    userNameTextBox: page.taUserID,
    passwordTextBox: page.taPassword,
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

function onTouchSignup() {
  // Router.go("pgDashboard");
  const page = this;

  if (!page.taUserID.text) {
    return alert("Username should not be empty");
  }
  fingerprint.loginWithFingerprint();
}

function onTouchAnonymous() {
  Router.go("pgMainLookbook");
}

function onTouchFacebook() {
  Router.go("pgLookbook");
}



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

module && (module.exports = PgSignupPhone);
