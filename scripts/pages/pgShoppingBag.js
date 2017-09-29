const extend = require('js-base/core/extend');
const PgShoppingBagDesign = require('ui/ui_pgShoppingBag');

const PgShoppingBag = extend(PgShoppingBagDesign)(
  // Constructor
  function(_super) {
    // Initalizes super class for this page scope
    _super(this);
    // overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // overrides super.onLoad method
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
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
  superOnLoad();

  var myDataSet = [{
    title: 'Title 1'
  }, {
    title: 'Title 2'
  }, {
    title: 'Title 3'
  }, {
    title: 'Title 4'
  }, {
    title: 'Title 5'
  }, {
    title: 'Title 6'
  }, {
    title: 'Title 7'
  }, {
    title: 'Title 8'
  }, {
    title: 'Title 9'
  }];


  this.lvShoppingBag.itemCount = myDataSet.length;
  this.lvShoppingBag.onRowBind = function(shoppingBagItem, index) {
    var detail = shoppingBagItem.lblDetail,
     size = shoppingBagItem.lblSize,
     color = shoppingBagItem.lblColor;
    detail.text = myDataSet[index].title;
  };
}

module && (module.exports = PgShoppingBag);
