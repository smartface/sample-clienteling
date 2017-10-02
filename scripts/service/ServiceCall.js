const mixinDeep = require('mixin-deep');
const mcs = require("../lib/mcs");
const http = require("sf-core/net/http");
const Http = new http();
const requestQueue = [];
var userToken = null;
exports.registerUserToken = registerUserToken;
exports.createRequestOptions = createRequestOptions;
exports.hasUserToken = hasUserToken;
exports.request = request;

function registerUserToken(token) {
  if (token) {
    userToken = token;
    processQueue();
  }
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
  return requestOptions;
}


function hasUserToken() {
  return !!userToken;
}

function request(options, callback) {
  if (mcs.launched && (hasUserToken() || (options && options.immediate))) {
    performRequest(options, callback);
  }
  else {
    requestQueue.push({
      options,
      callback
    });
  }
}

function processQueue() {
  var req;
  while (req = requestQueue.shift()) {
    request(req.options, req.callback);
  }
}

function performRequest(options, callback) {
  if (userToken) {
    options = mixinDeep(options, {
      headers: {
        token: userToken
      }
    });
  }

  options.onLoad = function(response) {
    response.body = response.body.toString();
    var contentType = getContentType(response.headers);
    if (contentType === "application/json") {
      try {
        response.body = JSON.parse(response.body);
      }
      catch (e) {

      }
    }
    callback(null, response.body);
  };

  options.onError = function(error) {
    error.body = error.body.toString();
    var contentType = getContentType(error.headers);
    if (contentType === "application/json")
      error.body = JSON.parse(error.body);
    console.log(`Service Error -- Request: ${JSON.stringify(options)}`);
    callback(error);
  };

  Http.request(options);
}

function getContentType(headers) {
  var contentType = headers["Content-Type"];
  if (!contentType) {
    let headers = Object.keys(headers);
    for (let i in headers) {
      let h = headers[i];
      if (h.toLowerCase() === "content-type") {
        contentType = headers[h];
        break;
      }
    }
  }
  return contentType;
}
