require("./theme");

require("./theme");

/* globals lang */
require("i18n/i18n.js");

const Application = require("sf-core/application");
Application.onUnhandledError = function(e) {
  alert({
    title: lang.applicationError,
    message: e.message + "\n\n*" + e.sourceURL + "\n*" + e.line + "\n*" + e.stack
  });
};

require("sf-extension-utils");

const Router = require("sf-core/ui/router");
const System = require("sf-core/device/system");
const isTablet = require("./lib/isTablet");

require("./context/pageContext");
require("./theme");

// const settings = require("./settings.json");

// Deprecated
// var stylerBuilder = require("library/styler-builder");

// stylerBuilder.registerThemes(themeSettings.themes || "defaultTheme");
// stylerBuilder.setActiveTheme(themeSettings.currentTheme);
// ------------

var sliderDrawer;

if (System.OS === "iOS") {
  sliderDrawer = require("./sliderDrawer");
  Router.sliderDrawer = sliderDrawer;
}

Router.add("pgDashboard", require("./pages/pgDashboard"), true);
Router.add("pgSignupPhone", require("./pages/pgSignupPhone"), true);
Router.add("pgSignupTablet", require("./pages/pgSignupTablet"), true);
Router.add("pgMainLookbook", require("./pages/pgMainLookbook"), true);
Router.add("pgLookbook", require("./pages/pgLookbook"), true);
Router.add("pgWomen", require("./pages/pgWomen"), true);
Router.add("pgCustomerProfile", require("./pages/pgCustomerProfile"), true);
Router.add("pgShoppingBag", require("./pages/pgShoppingBag"), true);

Router.go("pgSignup" + (isTablet ? "Tablet" : "Phone"), {
/* Router.go("pgCustomerProfile", { */
  appStart: true
}); 

if (System.OS === "Android") {
  sliderDrawer = require("./sliderDrawer");
  Router.sliderDrawer = sliderDrawer;
}

// mcs.launch().then(() => {
//   console.log("mcs launch sucess");
// }).catch((err) => {
//   err = err ? JSON.stringify(err) : "unknown";
//   console.log(`mcs launch error! Reason: ${err}`);
// });
