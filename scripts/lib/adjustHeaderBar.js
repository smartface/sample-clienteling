const System = require('sf-core/device/system');
const Color = require("sf-core/ui/color");

module.exports = exports = function(page) {
    if (System.OS === "iOS") {
        page.flStatusBarBg && (page.flStatusBarBg.height = page.statusBar.height);
    }
    else {
        page.headerBar.visible = false;
        page.flStatusBarBg && page.layout.removeChild(page.flStatusBarBg);
    }
};
