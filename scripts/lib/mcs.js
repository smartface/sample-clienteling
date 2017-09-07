const MCS = require('sf-extension-mcs');
var options = {
	'backendId': 'b9ebb1a8-a5d9-49f2-b5c5-50bf1d7e7e64', //required
	'baseUrl': 'https://smartface-mobilebel.mobileenv.em2.oraclecloud.com', //required
	'androidApplicationKey': 'cddfbf73-a581-4e09-9121-e8f5da8fa49b', //required only for analytics & events
	'iOSApplicationKey': 'd599ef10-f6e0-4f7c-a8cf-598e11191909', //required only for analytics & events
	'anonymousKey': 'TU9CSUxFQkVMX1NNQVJURkFDRV9NT0JJTEVfQU5PTllNT1VTX0FQUElEOmZzOXEzakltbm9iX2hw' //required only to perform operations without logging in first
};
var mcs = new MCS(options);

module.exports = exports = mcs;