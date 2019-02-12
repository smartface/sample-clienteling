const extend = require('js-base/core/extend');
const PgWomenDesign = require('ui/ui_pgWomen');
const pgWomenSwipePageFactory = require("pages/pgWomenSwipePageFactory");
const SwipeView = require("sf-core/ui/swipeview");
//const Router = require("sf-core/ui/router");
const Color = require("sf-core/ui/color");
const adjustHeaderBar = require("../lib/adjustHeaderBar");

const PgWomen = extend(PgWomenDesign)(
    // Constructor
    function(_super, routeData, router) {
        _super(this);
        this._routeData = routeData;
        this._router = router;
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    });

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
    superOnShow();
    //Router.sliderDrawer.enabled = false;
  
    initDotIndicator(this);
    adjustHeaderBar(this);
    console.log("onShow");

}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
    const page = this;
    superOnLoad();
    console.log("onLoad");
    loadUI.call(this);
    page.flHeaderLeft.onTouchEnded = function() {
        page._router.goBack();
    };
}

function loadUI() {
    console.log("loadUI");
    const json = require("../sample-data/lookbook.json");
    var list = json.products;
    var swipeView = new SwipeView({
        page: this,
        flexGrow: 1,
        pages: [
            pgWomenSwipePageFactory(list[0].image),
            pgWomenSwipePageFactory(list[1].image),
            pgWomenSwipePageFactory(list[2].image),
            pgWomenSwipePageFactory(list[3].image)
        ],
        onPageSelected: onChildPageChanged.bind(this),
        marginBottom: 18,
        backgroundColor: Color.TRANSPARENT
    });

    this.flSwipe.addChild(swipeView);
}

function initDotIndicator(page) {
    page.dotIndicator.size = 4;
    page.layout.applyLayout();
}

function onChildPageChanged(index) {
    this.dotIndicator.currentIndex = index;
}

module && (module.exports = PgWomen);
