const extend = require('js-base/core/extend');
const PgLoginDesign = require('ui/ui_pgLogin');
const pgLoginContext = require("../context/pgLoginContext");
const orientationLib = require("sf-extension-utils").orientation;
const isTablet = require("../lib/isTablet");

const PgLogin = extend(PgLoginDesign)(
    // Constructor
    function(_super) {
        _super(this);
        const page = this;
        page.onShow = onShow.bind(page, page.onShow.bind(page));
        page.onLoad = onLoad.bind(page, page.onLoad.bind(page));
        page.onOrientationChange = onOrientationChange.bind(page);
        Object.assign(page, {
            dispose,
            setContextDispatcher
        });

        this.styleContext = pgLoginContext.createContext(this);
    });

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
    console.log(orientation);
    arrangeLayout(page, orientation);
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
    superOnLoad();
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
