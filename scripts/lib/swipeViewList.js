module.exports =(function(){
    var list=[], activeIndex=-1;
    
    return {
      getList: () =>  list || [],
      setList: _list => list = _list,
      setActiveIndex: index => activeIndex = index,
      getActiveIndex: () =>  activeIndex
    };
})();