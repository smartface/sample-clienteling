const mixinDeep = require('mixin-deep');
const mcs = require("../lib/mcs");
var userToken = null;
exports.registerUserToken = registerUserToken;
exports.createRequestOptions = createRequestOptions;

function registerUserToken(token) {
  if (token)
    userToken = token;
  else
    userToken = null;
}

function createRequestOptions(endPointName, options) {
  var mcsRequestOptions = mcs.createRequestOptions({
    apiName: "eCommerce",
    endpointName: endPointName
  });
  var requestOptions = mixinDeep(mcsRequestOptions, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }, options || {});
  if (userToken) {
    requestOptions(requestOptions, {
      headers: {
        token: userToken
      }
    });
  }
  return requestOptions;
}
