const Screen = require('sf-core/device/screen');
const System = require('sf-core/device/system');

const constants = {
    PORTRAIT: "portrait",
    LANDSCAPE: "landspace"
};

function getOrientation() {
    var w = Screen.width;
    var h = Screen.height;
    if (h > w)
        return constants.PORTRAIT;
    else
        return constants.LANDSCAPE;
}

function rotate(orientation) {
    if (orientation === constants.LANDSCAPE)
        return constants.PORTRAIT;
    else return constants.LANDSCAPE;
}

function getOrientationOnchage() {
    var orientation = getOrientation();
    if(System.OS === "Android")
        return orientation;
    else
        return rotate(orientation);
}

Object.assign(exports, constants, {
    getOrientation,
    rotate,
    getOrientationOnchage
});
