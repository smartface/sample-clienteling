var serviceCall = require("./ServiceCall");
const request = require("./request");

exports.getDashboardData = getDashboardData;

function getDashboardData() {
    var reqOps = serviceCall.createRequestOptions("dashboard", { method: "GET" });
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
