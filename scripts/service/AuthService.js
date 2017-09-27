var mcs = require("../lib/mcs");
var http = require("http");

function login(user, pass){
  var opt = mcs.createRequestOptions({apiName:"eCommerce",  endpointName: "login"});
  Object.assign(opt, {
    method: "POST",
    body: JSON.stringify({
      "username": "employee",
      "password": "password"
    })
  });
  
  return new Promise(function(resolve, reject){
    http.request(opt, 
      function(response){
          // Handling image request response 
          // myImageView.image = Image.createFromBlob(response.body);
          // Handling text request response
          // myLabel.text = response.body.toString();
          resolve(JSON.parse(response.body.toString()));
      },
      function(e){
        reject("Server responsed with: " + e.statusCode + ". Message is: " + e.message);
      });
  });
};


