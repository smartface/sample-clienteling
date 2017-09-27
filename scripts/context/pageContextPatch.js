const extend = require('js-base/core/extend');
const pageContext = require("./pageContext");

module.exports = function pageContextPatch(page, name){
  page.onLoad = onLoad.bind(page, page.onLoad.bind(page));

  function onLoad(superOnLoad) {
    superOnLoad();
  
    this.styleContext = pageContext.createContext(
      this,
      name,
      null,
      function reducers(state, actors, action, target) {
        return state;
      });
  }
  
  page.onOrientationChange = function() {
    setTimeout(function() {
      this.dispatch({
        type: "invalidate"
      });
  
      this.layout.applyLayout();
    }.bind(this), 10);
  };
  
  page.setContextDispatcher = function(dispatcher) {
    this.dispatch = dispatcher;
  };
};
