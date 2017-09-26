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

Router.add("page", require("./pages/pgMainLookbook"), true);
Router.go("page");
