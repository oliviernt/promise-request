# Promise based request

A Node.js promise wrapped http request library

This little lib offers a Promise wrapped request method (see: https://nodejs.org/api/http.html#http_http_request_options_callback).

## Usage

	request({
		scheme: 'https',
		host: 'api.twitter.com',
		path: '/1.1/statuses/mentions_timeline.json'
	}).then(function(result) {
		// do something on success...
	}, function(error) {
		console.error(error);
	});
