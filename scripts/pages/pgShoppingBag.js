const extend = require('js-base/core/extend');
//const Router = require("sf-core/ui/router");
const PgShoppingBagDesign = require('ui/ui_pgShoppingBag');
const Color = require("sf-core/ui/color");
const adjustHeaderBar = require("../lib/adjustHeaderBar");
const addContextChild = require("@smartface/contx/lib/smartface/action/addChild");

const TRANSPARENT_GRAY = Color.create(15, 125, 125, 125);
const PgShoppingBag = extend(PgShoppingBagDesign)(
    // Constructor
    function(_super, routeData, router) {
        _super(this);
        this._router = router;
        this._routeData = routeData;
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.onOrientationChange = onOrientationChange.bind(this, this.onOrientationChange.bind(this));
        this.invalidateListView = invalidateListView.bind(this, this.lvShoppingBag.onRowCreate.bind(this));
    }
);  


function invalidateListView(originalOnRowCreate) {
    this.lvShoppingBag.dispatch({
        type: "removeChildren"
    });

    var id = 0;

    this.lvShoppingBag.onRowCreate = function lvShoppingBag_onRowCreate(superOnRowCreate) {
        const row = originalOnRowCreate.call(this);
        this.dispatch(addContextChild("row_" + (++id), row));
        return row;
    };
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
    superOnShow();
    //Router.sliderDrawer.enabled = false;
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
    const page = this;
    superOnLoad();
    adjustHeaderBar(page);
    page.lvShoppingBag.itemCount = 5;
    page.lvShoppingBag.refreshEnabled = false;

    page.lvShoppingBag.onRowBind = function(shoppingBagItem, index) {
        (shoppingBagItem.backgroundColor = (index % 2 === 0) ? TRANSPARENT_GRAY : Color.TRANSPARENT);
        shoppingBagItem.productImage.loadFromUrl("https://smartfacecdn.blob.core.windows.net/apps/ecommerce/images/product/D56363.png");
    };
    page.flHeaderLeft.onTouchEnded = function() {
        page._router.goBack();
        page.invalidateListView();
    }
}    


function onOrientationChange(superOnOrientationChange) {
    superOnOrientationChange && superOnOrientationChange();
    this.lvShoppingBag.refreshData();
    this.lvShoppingBag.stopRefresh();
}

module && (module.exports = PgShoppingBag);
