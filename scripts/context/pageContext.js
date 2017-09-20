const StyleContext = require("../lib/StyleContext");
const styler = require("@smartface/styler/lib/styler");
const getOneProp = require("library/styler-builder")
	.getOneProp;
const INIT_CONTEXT_ACTION_TYPE = require("../lib/Context")
	.INIT_CONTEXT_ACTION_TYPE;

const styles = require("../themes/blue");
var styling = styler(styles);
var deviceType = "";
var orientation = "";

module.exports = {
	createContext
};

function createContext(component) {
	var styleContext = StyleContext.fromSFComponent(
		component,
		"pgLogin",
		//initial classNames
		function(name){
		  return "#"+name;
		},
		//context hooks
		function(hook) {
			switch(hook) {
				case 'beforeAssignComponentStyles':
					return function beforeStyleAssignment(name, className) {
						return className;
					};
				case 'beforeStyleDiffAssign':
					return function beforeStyleAssignment(styles) {
						Object.keys(styles)
							.forEach(function(key) {
								styles[key] = getOneProp(key, styles[key]);
							});

						return styles;
					};
				case 'reduceDiffStyleHook':
					return function reduceDiffStyleHook(oldStyles, newStyles) {
						function isEqual(oldStyle, newStyle) {
							if(oldStyle === undefined) {
								return false;
							}

							var keys1 = Object.keys(oldStyle);
							var keys2 = Object.keys(newStyle);

							if(keys1.length !== keys2.length) {
								return false;
							}

							let res = keys2.some(function(key) {
								return oldStyle[key] !== newStyle[key];
							});

							return !res;
						}

						return function diffStylingReducer(acc, key) {
							if(typeof newStyles[key] === "object") {
								if(!isEqual(oldStyles[key], newStyles[key])) {
									acc[key] = newStyles[key];
								}
							} else if(oldStyles[key] !== newStyles[key]) {
								acc[key] = newStyles[key];
							}

							return acc;
						};
					};
			}
		}
	);

	// creates an initial styling for the context
	styleContext(
		styling
		/*function(className) {
			return function getStyle() {
				return getPropsFromStyle(styling, className);
			}
		}*/
		,
		reducer
	);

	return function setStyle(newStyles) {
		try {
			const styling = styler(styles, newStyles);
			// injects a new styling to the context
			styleContext(styling
				/*function(className) {
								return function getStyle() {
									return getPropsFromStyle(styling, className);
								}
							}*/
				, reducer);
		} catch(e) {
			alert(e.message);
		}
	};
}

function reducer(state, actors, action, target) {
	const newState = Object.assign({}, state);
	
	switch(action.type) {
		case "changeOrientation":
			for(var actorName in actors) {
				var actor = actors[actorName];
				// if(actor.initialClassName) {
					deviceType = action.deviceType;
					orientation = action.orientation;

					actor.resetClassNames();
					actor.pushClassName(`${actor.initialClassName}-${action.deviceType}-${action.orientation}`);
					
				// 	actor.pushClassName(actor.initialClassName);
				// 	var className2Add = `${actor.initialClassName}.${action.deviceType}.${action.orientation}`;

				// 	actor.pushClassName(className2Add);
				// }
			}
			
    	return newState;
	}

	return state;
}
