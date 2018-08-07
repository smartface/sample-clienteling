/* globals lang */
const Application = require("sf-core/application");
Application.onUnhandledError = function(e) {
  alert({
    title: lang.applicationError,
    message: e.message + "\n\n*" + e.sourceURL + "\n*" + e.line + "\n*" + e.stack
  });
};

require("i18n/i18n.js");
require("sf-extension-utils");
require("./context/pageContext");
require("./theme");

const Router = require("sf-core/ui/router");
const System = require("sf-core/device/system");
const isTablet = require("./lib/isTablet");

if (System.OS === "iOS") {
  Router.sliderDrawer = require("./sliderDrawer");
}

Router.add("pgDashboard", "pages/pgDashboard", true);
Router.add("pgSignupPhone", "pages/pgSignupPhone", true);
Router.add("pgSignupTablet", "pages/pgSignupTablet", true);
Router.add("pgMainLookbook", "pages/pgMainLookbook", true);
Router.add("pgLookbook", "pages/pgLookbook", true);
Router.add("pgWomen", "pages/pgWomen", true);
Router.add("pgCustomerProfile", "pages/pgCustomerProfile", true);
Router.add("pgShoppingBag", "pages/pgShoppingBag", true);
Router.go("pgSignup" + (isTablet ? "Tablet" : "Phone"), {
  appStart: true
});

if (System.OS === "Android") {
  Router.sliderDrawer = require("./sliderDrawer");
}

// mcs.launch().then(() => {
//   console.log("mcs launch sucess");
// }).catch((err) => {
//   err = err ? JSON.stringify(err) : "unknown";
//   console.log(`mcs launch error! Reason: ${err}`);
// });
