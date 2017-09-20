/* globals Android*/
const orientationLib = require("sf-extension-utils").orientation;
const System = require('sf-core/device/system');

var isTablet = false;
if (System.OS === "iOS" && orientationLib.shortEdge >= 720) {
    isTablet = true;
}
else if (System.OS === "Android") {
    let Activity = Android.getActivity();
    let context = Activity;
    let Configuration = Activity.getResources().getConfiguration();
    let xlarge = Boolean((context.getResources().getConfiguration().screenLayout & Configuration.SCREENLAYOUT_SIZE_MASK) === 4);
    let large = Boolean((context.getResources().getConfiguration().screenLayout & Configuration.SCREENLAYOUT_SIZE_MASK) == Configuration.SCREENLAYOUT_SIZE_LARGE);
    isTablet = (xlarge || large);
}

module.exports = exports = isTablet;
