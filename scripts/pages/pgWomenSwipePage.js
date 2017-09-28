const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
const Color = require('sf-core/ui/color');
const ImageView = require('sf-core/ui/imageview');

const Page_ = extend(Page)(
	// Constructor
	function(_super, props){
		// Initalizes super class for this page scope
		_super(this, {
		    onShow: onShow.bind(this),
			onLoad: onLoad.bind(this)
		});
		var img = new ImageView({
		    image: props.image
		});
		this.layout.addChild(img);
});

// Page.onShow -> This event is called when a page appears on the screen (everytime).
function onShow() {
    this.headerBar.visible = false;
    this.headerBar.title = "pgWomenSwipePage";
    this.headerBar.titleColor = Color.create("#000000");
    this.headerBar.backgroundColor = Color.create("#FFFFFF");
    this.statusBar.visible = false;
    this.statusBar.android && (this.statusBar.android.color = Color.create("#00A1F1"));
}

// Page.onLoad -> This event is called once when page is created.
function onLoad() {}

module && (module.exports = Page_);