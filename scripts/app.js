/* globals lang */
require("i18n/i18n.js"); // Generates global lang object

const Application = require("sf-core/application");

// Set uncaught exception handler, all exceptions that are not caught will
// trigger onUnhandledError callback.
Application.onUnhandledError = function(e) {
    alert({
        title: lang.applicationError,
        message: e.message + "\n\n*" + e.sourceURL + "\n*" + e.line + "\n*" + e.stack
    });
};

const Router = require("sf-core/ui/router");
require("sf-extension-utils");

//Router.add("pgLanding", require("./pages/pgLanding"), true);
//Router.add("pgLogin", require("./pages/pgLogin"), true);
//Router.add("pgDashboard", require("./pages/pgDashboard"), true);
//
//
//Router.go("pgLanding", { appStart: true }, false);



var settings = require("./settings.json");
var themeSettings = settings.config.theme;
var stylerBuilder = require("library/styler-builder");
stylerBuilder.registerThemes(themeSettings.themes || "Defaults");
stylerBuilder.setActiveTheme(themeSettings.currentTheme);

Router.add("page", require("./pages/pgDashboard"), true);

var mcs = require("./lib/mcs");
//TODO: launch mcs on login page. Disable login button. Enable it when it is successful.
mcs.launch().then(startApp).catch(startApp);


function startApp() {
    Router.go("page");
    var authService = require("./service/AuthService");
    var userService = require("./service/User");
    var dashBoard = require("./service/Dashboard");
    authService.login().then(function() {
        console.log("auth service success");
        callUser();
    }).catch(function(err) {
        console.log(`auth service error: ${JSON.stringify(err)}`);
    });

    function callUser() {
        userService.getUserData().then(function(userData) {
            console.log(`user data service success: ${JSON.stringify(userData)}`);
            getDashboardData();
        }).catch(function(err) {
            console.log(`user data service error: ${JSON.stringify(err)}`);
        });
    }

    function getDashboardData() {
        dashBoard.getDashboardData().then(function(userData) {
            console.log(`dashboard data service success: ${JSON.stringify(userData)}`);
        }).catch(function(err) {
            console.log(`dashboard data service error: ${JSON.stringify(err)}`);
        });
    }

}

// added for debug purpose
global.require = require;
