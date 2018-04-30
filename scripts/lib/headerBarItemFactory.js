const HeaderBarItem = require("sf-core/ui/headerbaritem");
const Router = require("sf-core/router");

module.exports = {
    backButton: function backButton(action, title) {
        var backButton = new HeaderBarItem({
            title: title || global.lang["back"],
            onPress: function() {
                action ?
                    action() :
                    Router.goBack();
            }
        });
        return backButton;
    }
};
