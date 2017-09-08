const extend = require('js-base/core/extend');
const PgLoginDesign = require('ui/ui_pgLogin');
const orientationLib = require("../lib/orientation");
const Screen = require('sf-core/device/screen');
const System = require('sf-core/device/system');
const ActionKeyType = require('sf-core/ui/actionkeytype');
const KeyboardType = require('sf-core/ui/keyboardtype');
const Router = require("sf-core/ui/router");

var gapV;
var gapH = 2 * 26;
var shortEdge;
var longEdge;

const PgLogin = extend(PgLoginDesign)(
    // Constructor
    function(_super) {
        _super(this);
        const page = this;
        page.onShow = onShow.bind(page, page.onShow.bind(page));
        page.onLoad = onLoad.bind(page, page.onLoad.bind(page));
        page.onOrientationChange = onOrientationChange.bind(page);
    });

function onLoad(superOnLoad) {
    superOnLoad();
    const page = this;
    page.tbUsername.onActionButtonPress = function() {
        page.tbPassword.requestFocus();
    };
    page.tbPassword.onActionButtonPress = function() {
        startLogin.call(page);
    };
    page.tbUsername.actionKeyType = ActionKeyType.NEXT;
    page.tbPassword.actionKeyType = ActionKeyType.SEND;
    if (System.OS === "Android") {
        page.tbPassword.keyboardType = KeyboardType.TEXTNOSUGGESTIONS;
    }
}


function onShow(superOnShow) {
    superOnShow();
    const page = this;
    gapV = page.headerBar.height + page.statusBar.height;
    shortEdge = Math.min(Screen.width, Screen.height);
    longEdge = Math.max(Screen.width, Screen.height);

    page.flInfo.maxHeight = Math.max((shortEdge * 0.7) - gapV,
        300
    );

    page.headerBar.leftItemEnabled = false;
    var orientation = orientationLib.getOrientation();
    if (System.OS === "Android")
        page.flInfo.bringToFront();


    arrangeLayout(page, orientation);



    console.log(`shortEdge = ${shortEdge}`);
    console.log(`longEdge = ${longEdge}`);
    console.log(`gapV = ${gapV}`);
}


function onOrientationChange() {
    const page = this;
    var orientation = orientationLib.getOrientationOnchage();
    arrangeLayout(page, orientation);
}

function arrangeLayout(page, orientation) {

    if (orientation === orientationLib.LANDSCAPE) {

        page.svMain.layout.height = Math.max((shortEdge * 0.8) - gapV,
            345.5 + //height of flLogin
            45.5 + //padding top of svMain
            55 // paddingBottom of svMain
        );
        page.flInfo.width = ((longEdge / 2) - gapH) + 0;
        page.flLogin.width = (longEdge / 2) - gapH;
        page.flLogin.height = Math.max(345.5,
            (shortEdge * 0.8) - (gapV + 44.5 + 55)
        );
        if (page.svMain.layout.height < (shortEdge - gapV)) {
            page.svMain.layout.paddingTop = (shortEdge * 0.15) + 44.5;
        }

    }
    else { //portrait
        page.svMain.layout.height = longEdge - gapV;
        page.flInfo.width = shortEdge - gapH;
        page.flLogin.width = shortEdge - gapH;
        page.svMain.layout.paddingTop = 44.5;
        page.flLogin.height = 345.5;
    }

    console.log(`svMain height = ${page.svMain.layout.height}`);
    console.log(`flLogin.height = ${page.flLogin.height}`);


    page.svMain.layout.applyLayout();
}

function startLogin() {
    const page = this;
    Router.go("pgDashboard")
}



module && (module.exports = PgLogin);
