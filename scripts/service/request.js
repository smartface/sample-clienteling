const Http = require("sf-core/net/http");

module.exports = exports = request;

function request(options, callback) {
    Http.request(options, (response) => {
        response.body = response.body.toString();
        callback(null, JSON.parse(response.body));
    }, (error) => {
        error.body = error.body.toString();
        let contentType = error.headers["Content-Type"];
        if (!contentType) {
            let headers = Object.keys(error.headers);
            for (let i in headers) {
                let h = headers[i];
                if (h.toLocaleLowerCase() === "content-type") {
                    contentType = error.headers[h];
                    break;
                }
            }
        }
        if (contentType === "application/json")
            error.body = JSON.parse(error.body);
        callback(error);
    });

}
