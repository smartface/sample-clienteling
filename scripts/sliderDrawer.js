const SliderDrawer = require('sf-core/ui/sliderdrawer');
const UISliderDrawer = require("./components/SliderDrawer");
const Color = require('sf-core/ui/color');
const HeaderBarItem = require('sf-core/ui/headerbaritem');
const Image = require('sf-core/ui/image');

var sliderDrawerWidth = 333;
var sliderDrawer = new SliderDrawer({
    width: sliderDrawerWidth,
    enabled: true,
    onLoad: function() {
        var uiSliderDrawer = new UISliderDrawer({
            width: sliderDrawerWidth,
            height: NaN,
            flexGrow: 1
        });
        this.moveHighlight = uiSliderDrawer.moveHighlight;
        sliderDrawer.layout.addChild(uiSliderDrawer);
        sliderDrawer.onHide = function sliderDrawer_onHide() {
            sliderDrawer.shown = false;
        };
        sliderDrawer.onShow = function sliderDrawer_onShow() {
            sliderDrawer.shown = true;
        };
        sliderDrawer.shown = false;

        sliderDrawer.applyTheme();
    },
    onShow: function() {
        console.log("sliderDrawer is shown");
    }
});

sliderDrawer.drawerPosition = SliderDrawer.Position.LEFT;
module.exports = exports = sliderDrawer;

sliderDrawer.moveHighlight = function() {};
sliderDrawer.setUserData = function() {};

sliderDrawer.applyTheme = function sliderDrawer_applyTheme() {};

sliderDrawer.setLeftItem = function setLeftItem(headerBar, force) {
    if (headerBar.leftItemSetBy === sliderDrawer && !force)
        return; //already set
    headerBar.leftItemSetBy = sliderDrawer;
    headerBar.leftItemEnabled = true;
    var sliderDrawerItem = new HeaderBarItem({
        image: Image.createFromFile("images://sliderdrawer.png"),
        color: Color.WHITE,
        onPress: function() {
            if (sliderDrawer.shown)
                sliderDrawer.hide();
            else
                sliderDrawer.show();
        }
    });
    headerBar.setLeftItem(sliderDrawerItem);
    headerBar.leftItem = sliderDrawerItem;
    sliderDrawer.enabled = true;
};
