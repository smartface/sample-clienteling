const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
const ImageView = require('sf-core/ui/imageview');
const ImageFillType = require("sf-core/ui/imagefilltype");
const FlexLayout = require('sf-core/ui/flexlayout');
const globalSvipeViewList = require("lib/swipeViewList");

const Page_ = extend(Page)(
	// Constructor
	function(_super, props){
		// Initalizes super class for this page scope
		_super(this, {
		    onShow: onShow.bind(this),
			onLoad: onLoad.bind(this)
		});
		this.layout.removeAll();
		var img = new ImageView({
		    alignSelf: FlexLayout.AlignSelf.STRETCH,
		    flexGrow: 1,
		    imageFillType: ImageFillType.ASPECTFIT
		});
		this.image = img;
		this.layout.addChild(img);
});

// Page.onShow -> This event is called when a page appears on the screen (everytime).
function onShow() {
    this.headerBar.visible = false;
    this.statusBar.visible = false;
    var index = globalSvipeViewList.getActiveIndex();
    if(index !== -1){
    	this.image.loadFromUrl(globalSvipeViewList.getList()[index]);
    }
}

// Page.onLoad -> This event is called once when page is created.
function onLoad() {}

module && (module.exports = Page_);