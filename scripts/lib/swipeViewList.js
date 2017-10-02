module.exports = (function() {
  var list = [],
    activeIndex = -1,
    activeImage = null;


  return {
    getList: () => list || [],
    setList: function(_list) { list = _list; },
    setActiveIndex: index => {
      activeIndex = index;
      if (activeImage && !activeImage.isLoaded) {
        activeImage.isLoaded = true;
        activeImage.loadFromUrl(list[index].image);
      }
    },
    getActiveIndex: () => activeIndex,
    setActiveImage: _image => {
      if (!activeImage) {
        laodImage(_image, activeIndex);
      }
      activeImage = _image;
    }
  };

  function laodImage(image, index) {
    image.isLoaded = true;
    image.loadFromUrl(list[index].image);
  }

})();
