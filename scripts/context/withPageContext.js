

module.exports = function withPageContext(page){
  return extend(page)(function(_super){
    _super(this);
    return this
  })
};
