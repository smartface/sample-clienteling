/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const ListViewItem1Design = require('library/ListViewItem1');

const ListViewItem1 = extend(ListViewItem1Design)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || ListViewItem1Design.defaults);
    this.pageName = pageName;
  }

);

module && (module.exports = ListViewItem1);