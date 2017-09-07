const mcs = require("./mcs");
var policies = null;
const pendingPolicyRequests = [];
refresh();
exports.refresh = refresh;
exports.getPolicies = getPolicies;


function setPolicies(newPolicies) {
    policies = newPolicies;
    var ppr = pendingPolicyRequests.shift();
    while (ppr) {
        ppr(policies);
        ppr = pendingPolicyRequests.shift();
    }
}

function getPolicies(callback) {
    if (!callback)
        return;
    if (policies) {
        callback(policies);
    }
    else {
        pendingPolicyRequests.push(callback);
    }
}

function refresh(callback) {
    mcs.getAppPolicies(function(err, result) {
        callback && pendingPolicyRequests.push(callback);
        if (!err) {
            setPolicies(JSON.parse(result));
        }
        else {
            setPolicies({});
        }

    });
}
