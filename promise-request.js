'use strict';

var http = require('http'),
    https = require('https'),
    util = require('util');

/**
 * Request
 *
 * returns a promise of an http request
 * 
 * Parameters:
 * - options: 
        - scheme: [string] http or https. Default: http
        - serialize: [function] will be executed on request body. Default: JSON.stringify()
        - deserialize: [function] will be executed on response body. Default: JSON.parse()
        - others: see https://nodejs.org/api/http.html#http_http_request_options_callback
 * - body: body string to send with the request (POST or PUT)
 */
module.exports = function(options, body) {
    var _options = {
        scheme: 'http',
        serialize: JSON.stringify,
        deserialize: JSON.parse
    };
    options = util._extend(_options, options);
    return new Promise(function(resolve, reject) {
        var module = options.scheme === 'https' ? https : http;
        var request = module.request(options, function(response) {
            if (response.statusCode >= 400) {
                reject(response);
            }
            var _data = '';
            response.on('data', function(data) {
                _data += data.toString();
            });
            response.on('end', function() {
                resolve(util._extend(response, {
                    data: options.deserialize(_data)
                }));
            });
            response.on('error', function(error) {
                reject(error);
            });
        });
        if (body) {
            request.write(options.serialize(body));
        }
        request.end();
    });
};
