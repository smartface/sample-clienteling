const extend = require('js-base/core/extend');
const PgSignupPhoneDesign = require('ui/ui_pgSignupPhone');
const Router = require("sf-core/ui/router");
const fingerprint = require("sf-extension-utils").fingerprint;
const authService = require("../service/AuthService");
const adjustHeaderBar = require("../lib/adjustHeaderBar");
const rau = require("sf-extension-utils").rau;

const PgSignupPhone = extend(PgSignupPhoneDesign)(
  // Constructor
  function(_super) {
    _super(this);

    this.onShow = onShow.bind(this, this.onShow.bind(this));
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

    this.btnSignup.onPress = onPressSignup.bind(this);
    this.btnAnonymous.onPress = onPressAnonymous;
    this.btnFacebook.onPress = onPressFacebook;
    this.taUserID.ios && (this.taUserID.ios.clearButtonEnabled = true);
    this.taPassword.ios && (this.taPassword.ios.clearButtonEnabled = true);
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
        password = page.taPassword.text;
      else
        password = fingerprintResult.password;
      if (!password)
        return alert("password is required");
      authService.login(page.taUserID.text, password).then((succeed) => {
        fingerprintResult && fingerprintResult.success(); //Important!
        page.indicator.visible = false;
        Router.go('pgDashboard');
      }).catch(function(error) {
        page.indicator.visible = false;
        return alert("Cannot login. Check user name and password. Or system is down");
      });
    }
  });
  rau.checkUpdate();
}

function onLoad(superOnLoad) {
  const page = this;
  superOnLoad();
  adjustHeaderBar(page);
  
  onTouch_image.call(this);
}

function onPressSignup() {
  const page = this;
  if (!page.taUserID.text) {
    return alert("Username should not be empty");
  }
  page.indicator.visible = true;
  fingerprint.loginWithFingerprint();
}

function onPressAnonymous() {}

function onPressFacebook() {}

function onTouch_image() {
  this.flBanner.onTouch = () =>{
     this.taUserID.text = "selfservice"
     this.taPassword.text = "123qweASD"
  }
}

module && (module.exports = PgSignupPhone);
