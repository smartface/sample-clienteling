var serviceCall = require("./ServiceCall");
const request = serviceCall.request;

exports.getUserData = getUserData;

function getUserData() {
    var reqOps = serviceCall.createRequestOptions("user", { method: "GET" });
    return new Promise((resolve, reject) => {
        request(reqOps, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}
