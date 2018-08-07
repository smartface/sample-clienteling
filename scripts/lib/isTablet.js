/* globals Android*/
const orientationLib = require("sf-extension-utils/lib/orientation");
const System = require('sf-core/device/system');

var isTablet = false;
if (System.OS === "iOS" && orientationLib.shortEdge >= 720) {
    isTablet = true;
}
else if (System.OS === "Android") {
    const SCREENLAYOUT_SIZE_MASK = 15,
        SCREENLAYOUT_SIZE_LARGE = 3;
    const AndroidConfig = require("sf-core/util/Android/androidconfig");
    let Activity = AndroidConfig.activity;
    let context = Activity;
    let xlarge = Boolean((context.getResources().getConfiguration().screenLayout & SCREENLAYOUT_SIZE_MASK) === 4);
    let large = Boolean((context.getResources().getConfiguration().screenLayout & SCREENLAYOUT_SIZE_MASK) == SCREENLAYOUT_SIZE_LARGE);
    isTablet = (xlarge || large);
}

module.exports = exports = isTablet;
