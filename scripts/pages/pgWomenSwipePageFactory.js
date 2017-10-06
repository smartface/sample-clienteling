const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
const ImageView = require('sf-core/ui/imageview');
const FlexLayout = require('sf-core/ui/flexlayout');
const Color = require("sf-core/ui/color");

function contructorFactory(url){
	return extend(Page)(
	// Constructor
	function(_super, props) {
		_super(this, {
			onShow: onShow.bind(this),
			onLoad: onLoad.bind(this)
		});
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
		this.orientation = Page.Orientation.AUTO;
		this.image = img;
		url && setTimeout(()=> img.loadFromUrl(url), 100);
		this.layout.addChild(img);
	});
}
// Page.onShow -> This event is called when a page appears on the screen (everytime).
function onShow() {
	this.headerBar.visible = false;
	this.statusBar.visible = false;
}

function onLoad() {}

module && (module.exports = contructorFactory);
