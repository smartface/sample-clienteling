const extend = require('js-base/core/extend');
const pageContext = require("./pageContext");

module.exports = function pageContextPatch(page, name){
  page.onLoad = onLoad.bind(page, page.onLoad.bind(page));
  page.onShow = onShow.bind(page, page.onShow.bind(page));
  page.onHide = onHide.bind(page, page.onHide ? page.onHide.bind(page) : null);
  page.onOrientationChange = onOrientationChange.bind(page, page.onOrientationChange ? page.onOrientationChange.bind(page) : null);
  
  function onLoad(superOnLoad) {
    superOnLoad();
  }
  
  function onHide(superOnHide) {
    superOnHide && superOnHide();
  }
  
  function onShow(superOnShow) {
    superOnShow();
    
    if(!this.styleContext) {
        setTimeout(function(){
          this.styleContext = pageContext.createContext(
            this,
            name,
            null,
            function reducers(state, actors, action, target) {
              return state;
            });
    
          this.dispatch({
            type: "invalidate"
          });
        }.bind(this), 1000);
        
    } else {
      setTimeout(function(){
        this.dispatch({
          type: "invalidate"
        });
      }.bind(this), 100);
    }
    
    this.layout.applyLayout();
  }
  
  function onOrientationChange(superOnOrientationChange) {
    superOnOrientationChange && superOnOrientationChange();
    
    this.dispatch({
      type: "orientationStarted"
    });
    
    this.layout.applyLayout();

    setTimeout(function() {
      this.dispatch({
        type: "orientationEnded"
      });

      this.layout.applyLayout();
    }.bind(this), 10);
  };
  
  page.setContextDispatcher = function(dispatcher) {
    this.dispatch = dispatcher;
  };
};
