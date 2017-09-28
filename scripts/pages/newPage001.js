/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const NewPage001Design = require('ui/ui_newPage001');

const NewPage001 = extend(NewPage001Design)(
  // Constructor
  function(_super) {
    // Initalizes super class for this page scope
    _super(this);
    // overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

  });

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
  superOnShow();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
  superOnLoad
    this.imgSunGlasses.onTouch = function() {
    var a = {};
    var lblGender = this.imgSunGlasses;
    Object.keys(lblGender).forEach(function(key) {
      if (typeof lblGender[key] !== "object" && typeof lblGender[key] !== "function")
        a[key] = lblGender[key];
    });
    console.log("imgSunGlasses -> " + JSON.stringify(a, null, "\t") + +"\n");
  }.bind(this);
  
  this.flInfo.onTouch = function() {
    var a = {};
    var lblGender = this.flInfo;
    Object.keys(lblGender).forEach(function(key) {
      if (typeof lblGender[key] !== "object" && typeof lblGender[key] !== "function")
        a[key] = lblGender[key];
    });
    console.log("flInfo -> " + JSON.stringify(a, null, "\t") + "\n\n");
  }.bind(this);
}

module && (module.exports = NewPage001);