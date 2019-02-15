const FlexLayout = require("sf-core/ui/flexlayout");
const SliderDrawer = require('sf-core/ui/sliderdrawer');
const SliderDrawerComp = require("./components/SliderDrawerComp");
const Application = require("sf-core/application");
const Screen = require("sf-core/device/screen");
const Color = require('sf-core/ui/color');
const HeaderBarItem = require('sf-core/ui/headerbaritem');
const componentContextPatch = require("@smartface/contx/lib/smartface/componentContextPatch");
const WIDTH = 275;

class SliderDrawerWrapper {
    constructor() {
        this.sliderDrawer = new SliderDrawer({
            width: WIDTH,
            enabled: false,
        });
        this.sliderDrawer.onLoad = this.onLoad.bind(this);
        this.sliderDrawer.onShow = this.onShow.bind(this);
        this.sliderDrawer.onHide = this.onHide.bind(this);
        this.sliderDrawer.layoutComp = new SliderDrawerComp();
        this.sliderDrawer.children = { layoutComp: this.sliderDrawer.layoutComp };
        this.sliderDrawer.layout.addChild(this.sliderDrawer.layoutComp);
        componentContextPatch(this.sliderDrawer, "sliderDrawer");
    }

    setRouter(val) {
        this.sliderDrawer.router = val;
        this.sliderDrawer.layoutComp && this.sliderDrawer.layoutComp.setRouter(val);
    }

    set position(pos) {
        this.sliderDrawer.drawerPosition = pos;
    }

    set enabled(val) {
        this.sliderDrawer.enabled = val;
        if (val)
            Application.sliderDrawer = this.sliderDrawer;
    }

    get enabled() {
        return this.sliderDrawer.enabled;
    }

    setView(view) {
        view.sliderDrawer = this.sliderDrawer;
    }

    hide() {
        this.sliderDrawer.shown = false;  
        //this.sliderDrawer.hide();
    }

    toggleShow() {
        this.sliderDrawer.state === SliderDrawer.State.CLOSED ?
        this.sliderDrawer.show() :
        this.sliderDrawer.hide();
    }

    onLoad() {
        this.moveHighlight = SliderDrawerComp.moveHighlight;
        //this.sliderDrawer.layoutComp.setRouter(this.sliderDrawer.router);
    }

    onShow() {
        if (this.sliderDrawer.currentPage) {
            this.sliderDrawer.currentPage.layout.touchEnabled = false;
        }
    }

    onHide() {
        this.sliderDrawer.shown = false;
        if (this.sliderDrawer.currentPage) {
          this.sliderDrawer.currentPage.layout.touchEnabled = true;
        }
    }
    
    moveHighlight() {}
    
    setLeftItem(headerBar, force) {
        if (headerBar.leftItemSetBy === this.sliderDrawer && !force)
            return; //already set
        headerBar.leftItemSetBy = this.sliderDrawer;
        headerBar.leftItemEnabled = true;
        var sliderDrawerItem = new HeaderBarItem({
            image: this.Image.createFromFile("images://sliderdrawer.png"),
            color: Color.WHITE,
            onPress: function() {
                if (this.sliderDrawer.shown)
                    this.sliderDrawer.hide();
                else
                    this.sliderDrawer.show();
            }
        });
        headerBar.setLeftItem(sliderDrawerItem);
        headerBar.leftItem = sliderDrawerItem;
        this.sliderDrawer.enabled = true;
    }
}

const slideDrawer = new SliderDrawerWrapper();
slideDrawer.position = SliderDrawer.Position.LEFT;
slideDrawer.enabled = false;
module.exports = slideDrawer;