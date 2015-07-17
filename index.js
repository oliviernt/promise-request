#!/usr/bin/env node
var http = require('http'),
    https = require('https'),
    util = require('util');

/**
 * Request
 *
 * returns a promise of an http request
 * 
 * Parameters:
 * - options: see https://nodejs.org/api/http.html#http_http_request_options_callback
 * - body: body string to send with the request (POST or PUT)
 */
module.exports = function(options, body) {
    var config = {
        scheme: 'http',
        port: 80
    };
    options = util._extend(config, options);
    return new Promise(function(resolve, reject) {
        var module = config.scheme === 'http' ? http : https;
        var request = module.request(options, function(response) {
            var _data = '';
            response.on('data', function(data) {
                _data += data.toString();
            });
            response.on('end', function() {
                resolve(_data);
            });
            response.on('error', function(error) {
                reject(error);
            });
        });
        if (body) {
            request.write(body);
        }
        request.end();
    });
};
