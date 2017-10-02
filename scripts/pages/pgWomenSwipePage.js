const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
const ImageView = require('sf-core/ui/imageview');
const FlexLayout = require('sf-core/ui/flexlayout');
const globalSvipeViewList = require("lib/swipeViewList");
const Color = require("sf-core/ui/color");

const Page_ = extend(Page)(
	// Constructor
	function(_super, props) {
		// Initalizes super class for this page scope
		_super(this, {
			onShow: onShow.bind(this),
			onLoad: onLoad.bind(this)
		});
		this.layout.removeAll();
		var img = new ImageView({
			positionType: FlexLayout.PositionType.ABSOLUTE,
			top: 10,
			left: 0,
			right: 0,
			bottom: 20,
			alignSelf: FlexLayout.AlignSelf.STRETCH,
			flexGrow: 1,
			imageFillType: ImageView.FillType.ASPECTFIT,
			backgroundColor: Color.TRANSPARENT
		});
		this.image = img;
		this.layout.addChild(img);
	});

// Page.onShow -> This event is called when a page appears on the screen (everytime).
function onShow() {
	this.headerBar.visible = false;
	this.statusBar.visible = false;
	globalSvipeViewList.setActiveImage(this.image);
}

// Page.onLoad -> This event is called once when page is created.
function onLoad() {}

module && (module.exports = Page_);
