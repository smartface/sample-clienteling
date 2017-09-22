const StyleContext = require("../lib/StyleContext");
const styler = require("@smartface/styler/lib/styler");
const commands = require("@smartface/styler/lib/commandsManager");
const merge = require("@smartface/styler/lib/utils/merge");
const getOneProp = require("library/styler-builder")
	.getOneProp;
	
const Screen = require('sf-core/device/screen');
const INIT_CONTEXT_ACTION_TYPE = require("../lib/Context")
	.INIT_CONTEXT_ACTION_TYPE;

const styles = require("../themes/blue");
var styling = styler(styles);

commands.addRuntimeCommandFactory(function(type){
  console.log(type);
  switch (type) {
    case '+page':
      return function pageCommand(opts){
        var isOK = (function(Screen) { return eval(opts.args); }({width: Screen.width, height: Screen.height}))
        // console.log("isOK"+isOK.toString()+" "+opts.args+" "+Screen.width)
				return  isOK ? opts.value : {};
      }
      
      break;
  }
});

var deviceType = "";
var orientation = "";

module.exports = {
	createContext
};

function createContext(component, name, classMap=null, reducers=null) {
	var styleContext = StyleContext.fromSFComponent(
		component,
		name,
		//initial classNames
		function(name){
		  const id = "#"+name
		  return classMap ? id+" "+classMap(name) : id;
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
							if(newStyles[key] !== null && typeof newStyles[key] === "object") {
								if(!isEqual(oldStyles[key], newStyles[key])) {
								  if(key == "flexProps")
									  Object.assign(acc, newStyles[key]);
									 else
  									 acc[key] = newStyles[key];
								}
							} else if(newStyles[key] !== null && oldStyles[key] !== newStyles[key]) {
								acc[key] = newStyles[key];
							} else if(newStyles[key] === null) {
							  acc[key] = NaN;
							}

							return acc;
						};
					};
			}
		}
	);
	
	const _contextReducer = reducers 
	  ? function(state, actors, action, target){
  	    reducers(contextReducer(state, actors, action, target), actors, action, target)
	    }
	  : contextReducer

	// creates an initial styling for the context
	styleContext(
		styling
		/*function(className) {
			return function getStyle() {
				return getPropsFromStyle(styling, className);
			}
		}*/
		,
		_contextReducer
	);

	return function setStyle(newStyles) {
		try {
			const styling = styler(styles, newStyles);
			// injects a new styling to the context
			styleContext(styling, _contextReducer);
		} catch(e) {
			alert(e.message);
		}
	};
}

function contextReducer(state, actors, action, target) {
	const newState = Object.assign({}, state);
	console.log(action.type);
	switch(action.type) {
	  case "invalidate" :
	    Object.keys(actors).forEach(function(name){
	      var actor = actors[name];
	      actor.setUgly(true);
	    });
	    
	    return newState;
		case "changeOrientation":
			for(var actorName in actors) {
				var actor = actors[actorName];
				// if(actor.initialClassName) {
					deviceType = action.deviceType;
					orientation = action.orientation;

					actor.resetClassNames();
					actor.pushClassName(`#${actor.name}-${action.deviceType}-${action.orientation}`);
					
				// 	console.log();
					
				// 	actor.pushClassName(actor.initialClassName);
				// 	var className2Add = `${actor.initialClassName}.${action.deviceType}.${action.orientation}`;

				// 	actor.pushClassName(className2Add);
				// }
			}
			
    	return newState;
	}

	return state;
}
