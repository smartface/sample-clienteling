const Page = require('sf-core/ui/page');
const FlexLayout = require('sf-core/ui/flexlayout');
const ActivityIndicator = require('sf-core/ui/activityindicator');
const Color = require('sf-core/ui/color');
const StatusBarStyle = require('sf-core/ui/statusbarstyle');
const style = require("../lib/style");
const Router = require("sf-core/ui/router");

const pgLanding = new Page({
    onShow,
    onLoad
});
module.exports = exports = pgLanding;

Object.assign(pgLanding.layout, {
    alignItems: FlexLayout.AlignItems.CENTER,
    justifyContent: FlexLayout.JustifyContent.CENTER,
    backgroundColor: Color.WHITE
});

var aiWait = new ActivityIndicator({
    color: Color.create("#4A90E2"),
    backgroundColor: Color.TRANSPARENT,
    width: 100,
    height: 100
});
aiWait.ios.type = ActivityIndicator.iOS.Type.WHITELARGE;
pgLanding.layout.addChild(aiWait);

function onShow(data) {
    if(!data.appStart) {
        throw("It should be shown from app.js");        
    }
    pgLanding.headerBar.visible = false;
    pgLanding.statusBar.visible = true;
    this.statusBar.visible = true;
    this.statusBar.android.color = Color.create("#4A90E2");
    this.statusBar.ios.style = StatusBarStyle.DEFAULT;
    style.ready(function() {
       Router.go("pgLogin", {
           appStart: true
       }, false);
    });
}

function onLoad() {}
