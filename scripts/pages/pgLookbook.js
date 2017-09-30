const extend = require('js-base/core/extend');

const PgLookbookDesign = require('ui/ui_pgLookbook');
const ListViewItem = require('sf-core/ui/listviewitem');
const ListView = require('sf-core/ui/listview');
const FlexLayout = require('sf-core/ui/flexlayout');
const Color = require('sf-core/ui/color');
const LookbookItem = require("components/LookbookItem");
const Screen = require('sf-core/device/screen');
const customerService = require("service/Customer");
const pageContextPatch = require("../context/pageContextPatch");

const ITEM_WIDTH = 140;
const json = require("../sample-data/customerProfile.json");
var myDataSet = json.whishlist.slice();

const PgLookbook = extend(PgLookbookDesign)(
    // Constructor
    function(_super) {
        // Initalizes super class for this page scope
        _super(this);
        // overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

        this.onOrientationChange = onOrientationChange.bind(this);

        pageContextPatch(this, "pgLookBook");

    });

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
    superOnShow();

}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
    superOnLoad();
    reDesignListviewItem.call(this);
    customerService
        .getLookBook(1445)
        .then(res => console.log("RES_> " + JSON.stringify(res, null, "\t")), err => console.log("ERR_> ") + JSON.stringify(err, null, "\t"));
}

function onOrientationChange() {
    reDesignListviewItem.call(this);
}

function reDesignListviewItem() {
    this.layout.removeChild(this.lvMain);
    this.lvMain = new ListView({
        positionType: FlexLayout.PositionType.RELATIVE,
        flexGrow: 1
    });
    var id = 0;
    var itemCountPerRow = Math.floor(Screen.width / ITEM_WIDTH);
    this.lvMain.onRowCreate = function() {
        var listItem = new ListViewItem({
            positionType: FlexLayout.PositionType.RELATIVE,
            flexGrow: 1,
            flexDirection: FlexLayout.FlexDirection.ROW,
            justifyContent: FlexLayout.JustifyContent.SPACE_BETWEEN,
            alignItems: FlexLayout.AlignItems.STRETCH,
            marginLeft: 5,
            width: Screen.width - 10,
            id: ++id
        });
        for (var i = 0; i < itemCountPerRow; ++i) {
            listItem.addChild(new LookbookItem({
                positionType: FlexLayout.PositionType.RELATIVE,
                alignSelf: FlexLayout.AlignSelf.CENTER,
                height: 200,
                width: 140,
                id: i+1
            }));
        }

        return listItem;

    };
    this.lvMain.rowHeight = 250;
    this.lvMain.itemCount = Math.ceil(myDataSet.length / itemCountPerRow);
    console.log("LıstView -> " + this.lvMain.rowHeight + " - " + this.lvMain.itemCount + " per " + itemCountPerRow);
    this.lvMain.onRowBind = function(listViewItem, index) {
        var item, sourceIndex, data;
        for (var i = 0; i < itemCountPerRow; ++i) {
            sourceIndex = (index * itemCountPerRow) + i;
            item = listViewItem.findChildById(i+1);
            data = myDataSet[sourceIndex];
            if (item && sourceIndex < myDataSet.length) {
                console.log("Index_>"+sourceIndex+"DATA_>"+JSON.stringify(data,null,"\t"));
                item.visible = true;
                data.image && item.imgPreview.loadFromUrl(data.image);
                item.lblPrice.text = "$" + data.price.amount;
                item.lblName.text = data.name;
            }
            else {
                item && (item.visible = false);
            }
        }
    };

    this.lvMain.refreshData();
    this.lvMain.stopRefresh();

    this.layout.addChild(this.lvMain);
}

module && (module.exports = PgLookbook);
