const commands = require("@smartface/styler/lib/commandsManager");
const merge = require("@smartface/styler/lib/utils/merge");
const isTablet = require("../lib/isTablet");
const Screen = require('sf-core/device/screen');
var orientationState = "ended";

commands.addRuntimeCommandFactory(function(type) {
	switch (type) {
		case '+page':
			return function pageCommand(opts) {
				opts = merge(opts);
				var isOK = (function(Screen) { return eval(opts.args); }({ width: Screen.width, height: Screen.height }));
				return isOK ? opts.value : {};
			};
		case '+orientationChange':
			return function pageCommand(opts) {
				opts = merge(opts);
				var isOK = (function(Screen, orientation) {
					return eval(opts.args);
				}({ width: Screen.width, height: Screen.height }, orientationState));
				return isOK ? opts.value : {};
			};
		case "+isTablet_landscape":
			return function pageCommand(opts) {
				//console.log("+isTablet_landscape :: " + JSON.stringify(opts));
				opts = merge(opts);
				var isOK = isTablet && Screen.width > Screen.height;
				return isOK ? opts.value : {};
			};
		case "+isTablet_portrait":
			return function pageCommand(opts) {
				//console.log("+isTablet_portrait :: " + JSON.stringify(opts));
				opts = merge(opts);
				var isOK = isTablet && Screen.width < Screen.height;
				return isOK ? opts.value : {};
			};
		case "+isTablet":
			return function pageCommand(opts) {
				//console.log("+isTablet :: " + JSON.stringify(opts));
				opts = merge(opts);
				return isTablet ? opts.value : {};
			};
	}
});

