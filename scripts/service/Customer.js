var serviceCall = require("./ServiceCall");
const request = serviceCall.request;

exports.getCutomerProfile = getCutomerProfile;
exports.getLookBook = getLookBook;
exports.getShoppingBag = getShoppingBag;
exports.addToShoppingBag = addToShoppingBag;
exports.removeProductFromShoppintBag = removeProductFromShoppintBag;
exports.updateItemInShoppingBag = updateItemInShoppingBag;

function getCutomerProfile(profileId) {
    var reqOps = serviceCall.createRequestOptions(`client/${profileId}/profile`, { method: "GET" });
    return new Promise((resolve, reject) => {
        request(reqOps, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function getLookBook(profileId) {
    var reqOps = serviceCall.createRequestOptions(`client/${profileId}/lookbook`, { method: "GET" });
    return new Promise((resolve, reject) => {
        request(reqOps, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function getShoppingBag(profileId) {
    var reqOps = serviceCall.createRequestOptions(`client/${profileId}/shoppingbag`, { method: "GET" });
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
/**
 * adds products to shopingBag
 * @example
 * customer.addToShoppingBag(1445, //profileId
 * [{    //add each item in array
 *     "productId": "D234-6",  //use variant productId if possible
 *     "amount": 2 //specify amount, at least 1
 * }]);
 */
function addToShoppingBag(profileId, items) {
    var reqOps = serviceCall.createRequestOptions(`client/${profileId}/shoppingbag`, {
        method: "POST",
        body: JSON.stringify({
            items
        })
    });
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

/**
 * removes products from shopingBag
 * @example
 * customer.removeProductFromShoppintBag(1445, //profileId
 * [
 *  "D234-6"  //use variant productId if possible
 * ]);
 */
function removeProductFromShoppintBag(profileId, items) {
    var reqOps = serviceCall.createRequestOptions(`client/${profileId}/shoppingbag`, {
        method: "DELETE",
        body: JSON.stringify({
            items
        })
    });
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

/**
 * changes amount of items
 * @example
 * customer.updateItemInShoppingBag(1445, //profileId
 * [{    //items in array
 *     "productId": "D234-6",  //use variant productId if possible
 *     "amount": 2 //specify amount, at least 1
 * }]);
 */ 
function updateItemInShoppingBag(profileId, items) {
    var reqOps = serviceCall.createRequestOptions(`client/${profileId}/shoppingbag`, {
        method: "PATCH",
        body: JSON.stringify({
            items
        })
    });
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
