var mcs = require("../lib/mcs");

module.exports = function MCSService() {
	return {
		login: function() {
			return new Promise(function(resolve, reject){
				mcs.login({
					username: "mobileapp",
					password: "123qweASD"
				}, 
				function(err, result) {
					if(err){
						reject(err);
					} else {
						resolve(result);
					}
				});
			});
		}
	};
};
