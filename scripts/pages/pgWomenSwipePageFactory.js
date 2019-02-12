const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
const ImageView = require('sf-core/ui/imageview');
const FlBusy = require('components/FlBusy');
const FlexLayout = require('sf-core/ui/flexlayout');
const Color = require("sf-core/ui/color");
const componentContextPatch = require("@smartface/contx/lib/smartface/componentContextPatch");

function contructorFactory(url) {
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
			var busy = new FlBusy({
				backgroundColor: Color.TRANSPARENT,
				positionType: FlexLayout.PositionType.ABSOLUTE,
				top: 10,
				left: 0,
				right: 0,
				bottom: 20,
			});
			this.orientation = Page.Orientation.AUTO;
			this.image = img;
			url && setTimeout(() => img.loadFromUrl(url), 1000);
		
			componentContextPatch(this, "svipeviewLayout");
			this.layout.addChild(busy, "busy");
			this.layout.addChild(img, "image");
		});
}
// Page.onShow -> This event is called when a page appears on the screen (everytime).
function onShow() {
	//this.headerBar.visible = false;
	//this.statusBar.visible = false;
}

function onLoad() {}

module && (module.exports = contructorFactory);
