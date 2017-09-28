const extend = require('js-base/core/extend');
const PgLookbookDesign = require('ui/ui_pgLookbook');

const PgLookbook = extend(PgLookbookDesign)(
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
        title: 'Smartface Title 1'
    }, {
        title: 'Smartface Title 2'
    }, {
        title: 'Smartface Title 3'
    }, {
        title: 'Smartface Title 4'
    }, {
        title: 'Smartface Title 5'
    }, {
        title: 'Smartface Title 6'
    }, {
        title: 'Smartface Title 7'
    }, {
        title: 'Smartface Title 8'
    }, {
        title: 'Smartface Title 9'
    }];

    this.lvMain.itemCount = myDataSet.length;
    this.lvMain.onRowBind = function(listViewItem, index) {
        var myLabelTitle = listViewItem.lblPrice;
        myLabelTitle.text = myDataSet[index].title;
    };

}

module && (module.exports = PgLookbook);
