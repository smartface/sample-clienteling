const extend = require('js-base/core/extend');
const PgLoginDesign = require('ui/ui_pgLogin');
const orientationLib = require("../lib/orientation");
const Screen = require('sf-core/device/screen');
const System = require('sf-core/device/system');
const ActionKeyType = require('sf-core/ui/actionkeytype');
const KeyboardType = require('sf-core/ui/keyboardtype');
const Router = require("sf-core/ui/router");
const pageContext = require("../context/pageContext");
const orientationLib = require("sf-extension-utils").orientation;
const isTablet = require("../lib/isTablet");

var gapV;
var gapH = 2 * 26;
var shortEdge;
var longEdge;

const PgLogin = extend(PgLoginDesign)(
    // Constructor
    function(_super) {
        _super(this);
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.onOrientationChange = onOrientationChange.bind(this);
        
        Object.assign(this, {
            dispose,
            setContextDispatcher
        });

        this.styleContext = pageContext.createContext(this);
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

    page.btnSignIn.onPress = function() {
        startLogin.call(page);
    };
}


/*function onShow(superOnShow) {
    superOnShow();
    const page = this;
    gapV = page.headerBar.height + page.statusBar.height;
    shortEdge = Math.min(Screen.width, Screen.height);
    longEdge = Math.max(Screen.width, Screen.height);

    // page.flInfo.maxHeight = Math.max((shortEdge * 0.7) - gapV,
    //     300
    // );

    page.headerBar.leftItemEnabled = false;
    var orientation = orientationLib.getOrientation();
    if (System.OS === "Android")
        page.flInfo.bringToFront();


    arrangeLayout(page, orientation);



    // console.log(`shortEdge = ${shortEdge}`);
    // console.log(`longEdge = ${longEdge}`);
    // console.log(`gapV = ${gapV}`);
}*/


/*function onOrientationChange() {
    const page = this;
    var orientation = orientationLib.getOrientationOnchage();
    arrangeLayout(page, orientation);
}
*/
/*function arrangeLayout(page, orientation) {

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
}*/

function startLogin() {
    const page = this;
    Router.go("pgDashboard")
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
    superOnShow();
    const page = this;
    var orientation = orientationLib.getOrientation();
    arrangeLayout(page, orientation);
}

function onOrientationChange() {
    const page = this;
    const orientation = orientationLib.getOrientationOnchage();
    arrangeLayout(page, orientation);
}

function arrangeLayout(page, orientation) {

    console.log(`is tablet? ${isTablet}`);

    page.dispatch({
        type: "applyLayout",
        orientation,
        deviceType: isTablet ? "tablet" : "phone"
    });
    page.layout.applyLayout();

}

function setContextDispatcher(dispatcher) {
    this.dispatch = dispatcher;
}

function dispose() {
    this.styleContext(null);
    this.dispatch = null;
    this.styleContext = null;
}

module && (module.exports = PgLogin);
