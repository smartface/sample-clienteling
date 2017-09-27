const mcs = require("../lib/mcs");
const serviceCall = require("./ServiceCall");
const request = require("./request");
exports.login = login;

function login(user, pass) {
  var opt = mcs.createRequestOptions({ apiName: "eCommerce", endpointName: "login" });
  Object.assign(opt, {
    method: "POST",
    body: JSON.stringify({
      "username": "employee", //TODO: use user
      "password": "password" //TODO: use pass
    })
  });

  return new Promise((resolve, reject)=> {
    request(opt, (err, result) => {
      if (err) {
        reject(err);
      }
      else {
        mcs.sessionId = String(Math.floor(Date.now() / 1000));
        serviceCall.registerUserToken(result.token);
        resolve(result);
      }
    });
  });
}
