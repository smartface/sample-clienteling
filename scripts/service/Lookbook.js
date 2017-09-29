var serviceCall = require("./ServiceCall");
const request = serviceCall.request;

exports.getProducts = getProducts;
exports.getProductDetails = getProductDetails;

function getProducts(categoryId) {
    var reqOps = serviceCall.createRequestOptions(`lookbook/category/${categoryId}`, { method: "GET" });
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

function getProductDetails(productId) {
    var reqOps = serviceCall.createRequestOptions(`lookbook/product/${productId}`, { method: "GET" });
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
