const mixinDeep = require('mixin-deep');
const mcs = require("../lib/mcs");
var userToken = "anonymous";
exports.registerUserToken = registerUserToken;
exports.createRequestOptions = createRequestOptions;

function registerUserToken(token) {
  userToken = token;
}

function createRequestOptions(endPointName, options) {
  var mcsRequestOptions = mcs.createRequestOptions({
    apiName: "eCommerce",
    endpointName: endPointName
  });
  var requestOptions = mixinDeep(mcsRequestOptions, {
    headers: {
      token: userToken
    }
  }, options || {});
  return requestOptions;
}
