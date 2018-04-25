// const MCS = require('sf-extension-mcs');
// const options = {
// 	'backendId': 'b9ebb1a8-a5d9-49f2-b5c5-50bf1d7e7e64',
// 	'baseUrl': 'https://smartface-mobilebel.mobileenv.em2.oraclecloud.com',
// 	'androidApplicationKey': 'cddfbf73-a581-4e09-9121-e8f5da8fa49b',
// 	'iOSApplicationKey': 'd599ef10-f6e0-4f7c-a8cf-598e11191909',
// 	'anonymousKey': 'TU9CSUxFQkVMX1NNQVJURkFDRV9NT0JJTEVfQU5PTllNT1VTX0FQUElEOmZzOXEzakltbm9iX2hw'
// };
// const mcs = new MCS(options);
// module.exports = exports = mcs;
// const launchQueue = [];

// const sendBasicEventSymbol = "__mcs.sendBasicEvent__";
// mcs[sendBasicEventSymbol] = mcs.sendBasicEvent;
// mcs.sendBasicEvent = sendBasicEvent;
// mcs.deviceToken = "0";
// mcs.sessionId = "0";

// mcs.launch = function() {
// 	var launchPromise = new Promise(function(resolve, reject) {
// 		mcs.login({
// 				username: "mobileapp",
// 				password: "123qweASD"
// 			},
// 			function(err, result) {
// 				if (err) {
// 					reject(err);
// 				}
// 				else {
// 					mcs.registerDeviceToken({
// 							packageName: "io.smartface.ecommerce",
// 							version: "1.0.0"
// 						},
// 						function(err, result) {
// 							if (err) {
// 								mcs.deviceToken = "emulator";
// 								setLaunched();
// 								reject(err);
// 							}
// 							else {
// 								mcs.deviceToken = result.notificationToken;
// 								setLaunched();
// 								resolve();
// 							}
// 						}
// 					);
// 				}
// 			}
// 		);
// 	});
// 	return launchPromise;
// };

// function sendBasicEvent(eventName, callback) {
// 	if (eventName.eventName)
// 		eventName = eventName.eventName;
// 	mcs.__sendBasicEvent__({
// 		deviceId: mcs.deviceToken,
// 		sessionId: mcs.sessionId,
// 		eventName
// 	}, callback);
// }


// function fireLaunchQueue() {
// 	var fn;
// 	while (fn = launchQueue.shift()) {
// 		fn.call(mcs);
// 	}
// }

// function setLaunched() {
// 	mcs.launched = true;
// 	fireLaunchQueue();
// }

// mcs.onLaunch = function(fn) {
// 	if (mcs.launched) {
// 		fn.call(mcs);
// 	}
// 	else {
// 		launchQueue.push(fn);
// 	}
// };
