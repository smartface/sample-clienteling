var mcs = require("../lib/mcs");

module.exports = function MCSService() {
	return {
		login: function() {
			mcs.login({
				username: "mobileapp",
				password: "123qweASD"
			}, 
			function(err, result) {
			});
		}
	};
};
