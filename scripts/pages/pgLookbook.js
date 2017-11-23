const extend = require('js-base/core/extend');
const PgLookbookDesign = require('ui/ui_pgLookbook');
const ListViewItem = require('sf-core/ui/listviewitem');
const ListView = require('sf-core/ui/listview');
const FlexLayout = require('sf-core/ui/flexlayout');
const LookbookItem = require("components/LookbookItem");
const Screen = require('sf-core/device/screen');
const Router = require("sf-core/ui/router");
const adjustHeaderBar = require("../lib/adjustHeaderBar");
const lookbookService = require("../service/Lookbook");
const Color = require("sf-core/ui/color");
const addContextChild = require("@smartface/contx/lib/smartface/action/addChild");

const ITEM_WIDTH = 140;
const ITEM_HEIGHT = 275;
var dataset = null;

const PgLookbook = extend(PgLookbookDesign)(
  // Constructor
  function(_super) {
    // Initalizes super class for this page scope
    _super(this);
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    this.onOrientationChange = onOrientationChange.bind(this, this.onOrientationChange.bind(this));
    this.flHeaderLeft.onTouchEnded = function() {
      Router.goBack();
    };
    
    this.itemsPool = [];
    
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
  Router.sliderDrawer.enabled = false;
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
  superOnLoad();
  adjustHeaderBar(this);
  redesignListviewItem.call(this);
}

function onOrientationChange(superOnOrientationChange) {
  superOnOrientationChange && superOnOrientationChange();
  setTimeout(redesignListviewItem.bind(this), 1);
}

function redesignListviewItem() {
  if(this.lvMain){
    this.layout.removeChild(this.lvMain);
    this.lvMain.onRowBind = function(){};
    this.lvMain.onRowCreate = function(){};
  }
  
  this.lvMain = new ListView({
    positionType: FlexLayout.PositionType.RELATIVE,
    flexGrow: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: Color.create(200, 241, 241, 241)
  });
  
  this.layout.addChild(this.lvMain, "lvMain");

  var id = 0;
  var itemCountPerRow = Math.floor(Screen.width / (ITEM_WIDTH + 20));
  // const items = this.itemsPool.slice(0, itemCountPerRow);
  
  this.lvMain.onRowSelected = function() {
    Router.go("pgWomen");
  };
  this.lvMain.refreshEnabled = false;
  this.lvMain.onRowCreate = function() {
    const itemid = ++id;
    var listItem = new ListViewItem({
      positionType: FlexLayout.PositionType.ABSOLUTE,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      flexGrow: 1,
      flexDirection: FlexLayout.FlexDirection.ROW,
      justifyContent: FlexLayout.JustifyContent.SPACE_BETWEEN,
      alignItems: FlexLayout.AlignItems.CENTER,
      alignContent: FlexLayout.AlignContent.CENTER,
      //backgroundColor: Color.GRAY,
      id: itemid
    });
    
    this.lvMain.dispatch(addContextChild("listItems_"+itemid, listItem));
    
    for (var i = 0; i < itemCountPerRow; ++i) {
      listItem.addChild(new LookbookItem({id: i + 200}), "listItem_"+i, ".pgLookBook_lookbookItem", {});
    }

    return listItem;
  }.bind(this);
  this.lvMain.rowHeight = ITEM_HEIGHT + 50;
  this.lvMain.itemCount = Math.ceil(dataset.length / itemCountPerRow);
  this.lvMain.onRowBind = function(listViewItem, index) {
    var item, sourceIndex, data;
    for (var i = 0; i < itemCountPerRow; ++i) {
      sourceIndex = (index * itemCountPerRow) + i;
      item = listViewItem.findChildById(i + 200);
      data = dataset[sourceIndex];
      
      if (item && sourceIndex < dataset.length) {
        item.visible = true;
        item.imgPreview.loadFromUrl(data.image);
        item.lblPrice.text = "$" + data.price.amount;
        item.lblName.text = data.name;
      } else {
        item && (item.visible = false);
      }
    }
  };

  this.lvMain.refreshData();
  this.lvMain.stopRefresh();
}

function loadUI() {
  //lookbookService.getProducts(754).then((json) => {
  //});
  var json = require("../sample-data/lookbook.json");
  dataset = json.products;
}

module && (module.exports = PgLookbook);
