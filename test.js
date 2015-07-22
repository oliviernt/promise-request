#!/usr/bin/env node
var assert = require('assert'),
    nock = require('nock');

describe('promise-request', function() {
    var promiseRequest = require('./promise-request');

    describe('without body', function() {
        it('should work without errors', function(done) {
            var expectedResponse = {success: true};

            nock('https://localhost')
                .get('/get')
                .reply(200, expectedResponse);

            promiseRequest({
                host: 'localhost',
                path: '/get',
                scheme: 'https'
            }).then(function(response) {
                assert.deepEqual(response.data, expectedResponse);
            }, function(error) {
                assert.fail(error, expectedResponse, 'unexpected call to error callback');
            }).then(done);
        });
    });

    describe('with body', function() {
        it('should work without errors', function(done) {
            var expectedResponse = {success: true};

            var body = {foo: 'post'};

            nock('https://localhost')
                .post('/post', body)
                .reply(200, expectedResponse);

            promiseRequest({
                method: 'POST',
                host: 'localhost',
                path: '/post',
                scheme: 'https'
            }, body).then(function(response) {
                assert.deepEqual(response.data, expectedResponse);
            }, function(error) {
                assert.fail(error, expectedResponse, 'unexpected call to error callback');
            }).then(done);
        });
    });

    describe('errors', function() {
        it('should be handled', function(done) {
            var expectedResponse = {success: true};

            nock('https://localhost')
                .get('/get')
                .reply(404);

            promiseRequest({
                host: 'localhost',
                path: '/get',
                scheme: 'https'
            }).then(function(response) {
                assert.fail(response, 404, 'unexpected call to sucess callback');
            }, function(error) {
                assert.equal(error.statusCode, 404);
            }).then(done);
        });
    });
});
