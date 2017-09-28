const extend = require('js-base/core/extend');
const pageContext = require("./pageContext");

module.exports = function pageContextPatch(page, name){
  page.onLoad = onLoad.bind(page, page.onLoad.bind(page));
  page.onShow = onShow.bind(page, page.onShow.bind(page));
  page.onHide = onHide.bind(page, page.onHide ? page.onHide.bind(page) : null);
  
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
  
  function onHide(superOnHide) {
    superOnHide && superOnHide();
    this.onOrientationChange = function(){};
  }
  
  function onShow(superOnShow) {
    superOnShow();
    this.dispatch({
      type: "invalidate"
    });
    
    this.layout.applyLayout();

    this.onOrientationChange = onOrientationChange.bind(this);
  }
  
  function onOrientationChange() {
    setTimeout(function() {
      this.dispatch({
        type: "invalidate"
      });

      this.layout.applyLayout();
    }.bind(this), 40);
  };
  
  page.setContextDispatcher = function(dispatcher) {
    this.dispatch = dispatcher;
  };
};
