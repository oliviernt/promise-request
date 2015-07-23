# Promise based request

A Node.js promise wrapped http request micro library

This little lib offers a Promise wrapped http(s).request method.

## Usage
    
``` js
var request = require('./promise-request');

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
```

## Parameters:
- options: 
    - scheme: [_string_] http or https. Default: http
    - serialize: [_function_] will be executed on request body. Default: JSON.stringify()
    - deserialize: [_function_] will be executed on response body. Default: JSON.parse()
    - ... more: see [https://nodejs.org/api/http.html#http_http_request_options_callback](https://nodejs.org/api/http.html#http_http_request_options_callback)
- body: object to send as the request body. options.serialize will be applied on it.

## Tests

You'll need [mocha](http://mochajs.org/) to run the tests. Once installed, simply run `mocha` in the project root directory.
