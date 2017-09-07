exports.ready = ready;

const policy = require("./policy");
const stylerBuilder = require("library/styler-builder");
const settings = require("./../settings.json");
const Data = require('sf-core/data');
var isReady = false;
const pendingReadyRequests = [];
var selectedThemeName = Data.getBooleanVariable("theme");
stylerBuilder.registerThemes(settings.config.theme.themes);

if (selectedThemeName) {
    setThemeAndActivate(selectedThemeName);
}
else {
    policy.getPolicies(function(policies) {
        setThemeAndActivate(policies.defaultTheme || "blue");
    });
}

function setThemeAndActivate(themeName) {
    settings.config.theme.currentTheme = themeName;
    stylerBuilder.setActiveTheme(settings.config.theme.currentTheme);
    isReady = true;
    var prr = pendingReadyRequests.shift();
    while (prr) {
        prr();
        prr = pendingReadyRequests.shift();
    }
}

function ready(callback) {
    if (!callback)
        return;

    if (isReady)
        callback();
    else
        pendingReadyRequests.push(callback);
}
