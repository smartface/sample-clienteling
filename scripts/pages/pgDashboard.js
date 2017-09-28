const extend = require('js-base/core/extend');
const PgDashboardDesign = require('ui/ui_pgDashboard');
const System = require('sf-core/device/system');
const Router = require("sf-core/ui/router");
const Color = require('sf-core/ui/color');
const pageContextPatch = require("../context/pageContextPatch");
const FlDashboardItem1 = require('components/FlDashboardItem1');
const FlDashboardItem2 = require('components/FlDashboardItem2');
const FlDashboardItem3 = require('components/FlDashboardItem3');
const FlDashboardItem4 = require('components/FlDashboardItem4');
const FlDashboardItem5 = require('components/FlDashboardItem5');

const PgDashboard = extend(PgDashboardDesign)(
    // Constructor
    function(_super) {
        _super(this);

        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

        pageContextPatch(this, "pgDashboard");
        loadUI.call(this);
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

    if (System.OS === "iOS") {
        page.flStatusBarBg.height = page.statusBar.height;
    }
    else {
        page.layout.removeChild(page.flStatusBarBg);
    }
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
    superOnLoad();
    const page = this;
    page.imgSignOut.onTouchEnded = function() {
        Router.goBack("pgSignupPhone");
    };
    //page.svInfo.scrollBarEnabled = false;
    //page.svInfo.layout.height = 90;
    //page.svInfo.layout.minWidth = 768;
}

function addReservations(items) {
    var self = this;
    items.forEach(function(item) {
        var flDashboardItem1 = new FlDashboardItem1();
        flDashboardItem1.width = NaN;
        flDashboardItem1.height = 80;
        flDashboardItem1.lblItemType.text = item.orderType;
        flDashboardItem1.lblItemName.text = item.employee;
        flDashboardItem1.lblItemTitle.text = item.location;
        // TODO: Date
        self.flReservationItems.addChild(flDashboardItem1);
        self.flReservationItems.height += flDashboardItem1.height;
    });
}

function addTodos(items) {
    var self = this;
    items.forEach(function(item) {
        var flDashboardItem2 = new FlDashboardItem2();
        flDashboardItem2.width = NaN;
        flDashboardItem2.height = 80;

        flDashboardItem2.lblItemTitle.text = item.title;
        flDashboardItem2.lblItemName.text = item.type;
        flDashboardItem2.lblItemType.text = item.status;
        if (item.status.toLowerCase() === "overdue") {
            // TODO: sf-core bug, color seems wrong
            flDashboardItem2.backgroundColor =
                Color.create(74, 144, 226, 63);
        }
        // TODO: Date

        self.flTodoItems.addChild(flDashboardItem2);
        self.flTodoItems.height += flDashboardItem2.height;
    });
}

function addOpenIncidents(items) {
    var self = this;
    items.forEach(function(item) {
        var flDashboardItem3 = new FlDashboardItem3();
        flDashboardItem3.width = NaN;
        flDashboardItem3.height = 80;

        flDashboardItem3.lblItemTitle.text = item.state;
        flDashboardItem3.lblItemName.text = item.employee;
        flDashboardItem3.lblItemType.text = item.title;
        if (item.state.toLowerCase() === "completed") {
            flDashboardItem3.lblItemTitle.textColor =
                Color.create(74, 144, 226, 255);
        }
        // TODO: Date

        self.flOpenIncidentItems.addChild(flDashboardItem3);
        self.flOpenIncidentItems.height += flDashboardItem3.height;
    });
}

function addStoreAndCorporateNews(items) {
    var self = this;
    items.forEach(function(item) {
        var flDashboardItem4 = new FlDashboardItem4();
        flDashboardItem4.width = NaN;
        flDashboardItem4.height = 80;

        flDashboardItem4.lblItemTitle.text = item.location;
        flDashboardItem4.lblItemName.text = item.employee;
        flDashboardItem4.lblItemType.text = item.type;
        // TODO: Date

        self.flNewsItems.addChild(flDashboardItem4);
        self.flNewsItems.height += flDashboardItem4.height;
    });
}

function addIncomingShipments(items) {
    var self = this;
    items.forEach(function(item) {
        var flDashboardItem5 = new FlDashboardItem5();
        flDashboardItem5.width = NaN;
        flDashboardItem5.height = 80;

        flDashboardItem5.lblItemTitle.text = item.title;
        flDashboardItem5.lblItemName.text = item.type;
        flDashboardItem5.lblItemType.text = item.status;
        // TODO: Date

        self.flShipmentsItems.addChild(flDashboardItem5);
        self.flShipmentsItems.height += flDashboardItem5.height;
    });
}

function loadUI() {
    const json = require("../sample-data/dashboard.json");
    addReservations.call(this, json.reservations);
    addTodos.call(this, json.todo.items);
    addOpenIncidents.call(this, json.openIncidents);
    addStoreAndCorporateNews.call(this, json.storeAndCorporateNews);
    addIncomingShipments.call(this, json.incomingShipments);
}

module && (module.exports = PgDashboard);
