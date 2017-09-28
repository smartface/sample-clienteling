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

/*{
	"width": 150,
	"height": null,
	"touchEnabled": true,
	"visible": true,
	"imageFillType": "ASPECTFIT",
	"backgroundColor": "rgba(255,255,255,0)",
	"alpha": 1,
	"borderColor": "rgba(0,0,0,1)",
	"borderWidth": 0,
	"font": {},
	"flexProps": {
		"alignSelf": "AUTO",
		"positionType": "RELATIVE",
		"flexGrow": 0
	},
	"image": "smartface.png",
	"minHeight": 50,
	"minWidth": null,
	"maxHeight": 50,
	"maxWidth": null
}*/

commands.addRuntimeCommandFactory(function(type){
  switch (type) {
    case '+page':
      return function pageCommand(opts){
        var isOK = (function(Screen) { return eval(opts.args); }({width: Screen.width, height: Screen.height}));
        // console.log("isOK"+isOK.toString()+" "+opts.args+" "+Screen.width)
				return  isOK ? opts.value : {};
      };
      
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
		  const id = "#"+name;
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
  								// console.log(key+":::"+acc[key]+":::"+JSON.stringify(newStyles[key]))
						  //align is readolnly issue
						  if(key === 'align'){
						    delete acc[key];
						    return acc;
						  } if(key == "flexProps"){
					     if(!oldStyles[key] === undefined){
					        Object.assign(acc, newStyles[key]);
					      } else {
                  Object.keys(newStyles[key])
                  	.forEach(function(name) {
                  		if(oldStyles[key] && newStyles[key][name] !== oldStyles[key][name]) {
                  			if(newStyles[key][name] === null) {
                  				if(name === "flexGrow") {
                  					acc[name] = 0;
                  				} else {
                  					acc[name] = NaN;
                  				}
                  			} else {
                  				acc[name] = newStyles[key][name];
                  			}
                  		} else {
                				acc[name] = newStyles[key][name];
                  		}
                  	})
                }
  					  } else if(newStyles[key] !== null && typeof newStyles[key] === "object") {
  							if(!isEqual(oldStyles[key], newStyles[key])) {
  								 acc[key] = newStyles[key];
  							}
  						} else if(oldStyles[key] !== newStyles[key]) {
  							acc[key] = newStyles[key];
  						}
							
							if(acc[key] === null) {
							  if(key == "flexGrow")
							    acc[key] = 0;
							  else
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
  	    reducers(contextReducer(state, actors, action, target), actors, action, target);
	    }
	  : contextReducer;

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
