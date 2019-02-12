const Http = require("sf-core/net/http");
exports.login = login;

function login(user, pass) {

  return new Promise((resolve, reject) => {

    var username = user;
    var password = pass;
    var url = "https://commonsmartface.blob.core.windows.net/clienteling/clienteling.json";
    var sessionManager = new Http();

    var request = sessionManager.requestJSON({
      url: url,
      onLoad: function(e) {
        var responseBody = e.body.toString();
        //console.log("responseBody:"+responseBody);
        var parseJSON = JSON.parse(responseBody);
        if (username === parseJSON[0].username && password === parseJSON[0].password) {
          return resolve(null, responseBody);
        }
        else {
          reject(responseBody);
        }
      },
      onError: function(err) {
        return reject(err);
      }
    })
  });
  // return new Promise((resolve, reject) => {
  //   mcs.onLaunch(() => {
  //     var opt = mcs.createRequestOptions({ apiName: "eCommerce", endpointName: "login" });
  //     Object.assign(opt, {
  //       method: "POST",
  //       immediate: true,
  //       body: JSON.stringify({
  //         "username": "employee", //TODO: use user
  //         "password": "password" //TODO: use pass
  //       })
  //     });
  //     Object.assign(opt.headers, {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json"
  //     });

  //     request(opt, (err, result) => {
  //       if (err) {
  //         reject(err);
  //       }
  //       else {
  //         mcs.sessionId = String(Math.floor(Date.now() / 1000));
  //         serviceCall.registerUserToken(result.token);
  //         resolve(result);
  //       }
  //     });
  //   });
  // });
}

// function logout() {
//   return new Promise((resolve, reject) => {
//     mcs.sessionId = "0";
//     serviceCall.registerUserToken(null);
//     resolve();
//   });
// }
