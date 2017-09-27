const MCS = require('sf-extension-mcs');
const options = {
	'backendId': 'b9ebb1a8-a5d9-49f2-b5c5-50bf1d7e7e64', //required
	'baseUrl': 'https://smartface-mobilebel.mobileenv.em2.oraclecloud.com', //required
	'androidApplicationKey': 'cddfbf73-a581-4e09-9121-e8f5da8fa49b', //required only for analytics & events
	'iOSApplicationKey': 'd599ef10-f6e0-4f7c-a8cf-598e11191909', //required only for analytics & events
	'anonymousKey': 'TU9CSUxFQkVMX1NNQVJURkFDRV9NT0JJTEVfQU5PTllNT1VTX0FQUElEOmZzOXEzakltbm9iX2hw' //required only to perform operations without logging in first
};
const mcs = new MCS(options);
module.exports = exports = mcs;

const sendBasicEventSymbol = new Symbol("mcs.sendBasicEvent");
mcs[sendBasicEventSymbol] = mcs.sendBasicEvent;
mcs.sendBasicEvent = sendBasicEvent;
mcs.deviceToken = "0";
mcs.sessionId = "0";

mcs.launch = function() {
	return new Promise(function(resolve, reject) {
		mcs.login({
				username: "mobileapp",
				password: "123qweASD"
			},
			function(err, result) {
				if (err) {
					reject(err);
				}
				else {
					mcs.registerDeviceToken({
							packageName: "io.smartface.ecommerce",
							version: "1.0.0"
						},
						function(err, result) {
							if (err) {
								reject(err);
							}
							else {
								mcs.deviceToken = result.notificationToken;
								resolve();
							}
						}
					);
				}
			}
		);
	});
};

function sendBasicEvent(eventName, callback) {
	if (eventName.eventName)
		eventName = eventName.eventName;
	mcs.__sendBasicEvent__({
		deviceId: mcs.deviceToken,
		sessionId: mcs.sessionId,
		eventName
	}, callback);
}
