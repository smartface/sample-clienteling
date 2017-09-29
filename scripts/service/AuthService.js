const mcs = require("../lib/mcs");
const serviceCall = require("./ServiceCall");
const request = serviceCall.request;
exports.login = login;
exports.logout = logout;

function login(user, pass) {
  return new Promise((resolve, reject) => {
    mcs.onLaunch(() => {
      var opt = mcs.createRequestOptions({ apiName: "eCommerce", endpointName: "login" });
      Object.assign(opt, {
        method: "POST",
        immediate: true,
        body: JSON.stringify({
          "username": "employee", //TODO: use user
          "password": "password" //TODO: use pass
        })
      });
      Object.assign(opt.headers, {
        "Content-Type": "application/json",
        "Accept": "application/json"
      });

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
  });
}

function logout() {
  return new Promise((resolve, reject) => {
    mcs.sessionId = "0";
    serviceCall.registerUserToken(null);
    resolve();
  });
}
