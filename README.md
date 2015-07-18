# Promise based request

A Node.js promise wrapped http request micro library

This little lib offers a Promise wrapped http(s).request method.

## Usage
	
	var request = require('promise-request');

	// see https://nodejs.org/api/http.html#http_http_request_options_callback for options
	var config = {
		scheme: 'https',
		host: 'api.twitter.com',
		path: '/1.1/statuses/mentions_timeline.json',
		method: 'GET'
	};

	request(config).then(function(result) {
		// do something on success...
	}, function(error) {
		console.error(error);
	});
