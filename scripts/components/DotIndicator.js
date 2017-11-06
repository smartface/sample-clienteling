/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const Color = require("sf-core/ui/color");
const FlexLayout = require('sf-core/ui/flexlayout');
const addPageContextChild = require("@smartface/contx/lib/smartface/action/addPageContextChild")
const pushClassNames = require("@smartface/contx/lib/styling/action/pushClassNames")
const removeClassName = require("@smartface/contx/lib/styling/action/removeClassName")

const DotIndicatorDesign = require('library/DotIndicator');
// const getCombinedStyle = require("library/styler-builder").getCombinedStyle;
// const ItemStyle = getCombinedStyle(".flexLayout .flexLayout-dotIndicator-item.inactive", {});

const PREFIX = "dot";
// var activeSettings = getCombinedStyle(".flexLayout-dotIndicator-item.active", {});
// var inactiveSettings = getCombinedStyle(".flexLayout-dotIndicator-item.inactive", {});

const DotIndicator = extend(DotIndicatorDesign)(
	//constructor
	function(_super, props, pageName) {
		// initalizes super class for this scope
		_super(this, props || DotIndicatorDesign.defaults);
		this.pageName = pageName;

		var _currentIndex = 0;
		this.lastActiveIndex = 0;
		var _size = 3;
		var _activeColor = null;
		var _inactiveColor = null;
		this._styles = {};
		
	/*this.subscribeContext = function(e) {
			if (e.type == 'new-styles') {
				const styles = e.data;
				console.log(JSON.stringify(styles));
				
				Object.keys(e.data).forEach(function(key) {
          this[key] = e.data[key];
        }.bind(this));
        
			}
		}.bind(this);*/
		
		Object.defineProperties(this, {
			'currentIndex': {
				get: function() {
					return _currentIndex;
				},
				set: function(value) {
					if (typeof value !== "number") {
						throw new TypeError("currentIndex should be number");
					}
					if (value >= _size || value < 0) {
						throw new Error("currentIndex is out of range");
					}

					this.children[PREFIX + value].dispatch(pushClassNames(".flexLayout-dotIndicator-item.active"));
					value !== _currentIndex 
						&& this.children[PREFIX + _currentIndex].dispatch(removeClassName(".flexLayout-dotIndicator-item.active"));
					this.lastActiveIndex = _currentIndex;
					_currentIndex = value;
					updateDots.call(this);
				}
			},
			'size': {
				get: function() {
					return _size;
				},
				set: function(value) {
					if (typeof value !== "number") {
						throw new TypeError("size should be number");
					}

					_size = value;
					setSize.call(this, _size);
				}
			},
			/*'activeColor': {
				get: function() {
					return _activeColor;
				},
				set: function(value) {
					_activeColor = value;
					updateDots.call(this);
				}
			},
			'inactiveColor': {
				get: function() {
					return _inactiveColor;
				},
				set: function(value) {
					_inactiveColor = value;
					updateDots.call(this);
				}
			}*/
		});
	}
);

function updateDots(indicator) {
	// if (this.activeColor !== null) {
	// 	activeSettings.backgroundColor = indicator.activeColor;
	// }
	// if (indicator.inactiveColor !== null) {
	// 	inactiveSettings.backgroundColor = indicator.inactiveColor;
	// }
	
	// Object.assign(indicator.children[PREFIX + indicator.lastActiveIndex], inactiveSettings);
	// Object.assign(indicator.children[PREFIX + indicator.currentIndex], activeSettings);
}

function setSize(newSize) {
	this.removeAll();
	this.children = {};

	for (var i = 0; i < newSize; i++) {
		this.children[PREFIX+i] = new FlexLayout();
		this.dispatch(addPageContextChild(PREFIX + i, this.children[PREFIX + i], [".flexLayout", ".flexLayout-dotIndicator-item.inactive"]));
		this.addChild(this.children[PREFIX + i]);
	}
	
	this.currentIndex = 0;

	this.applyLayout();
	
	// this.dispatch({
	// 	type: "updateContextTree"
	// });
}

module && (module.exports = DotIndicator);
