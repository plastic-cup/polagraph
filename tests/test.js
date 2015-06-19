var Code = require('code');
var Lab = require('lab');
var fs = require('fs');
var lab = exports.lab = Lab.script();
var server = require('../server');
var handlers = require('../handlers');
var filetype = require('file-type');
var FormData = require('form-data');
var stream = require('stream');
var http = require('http');
var assert = require('assert');

lab.test("Main endpoint", function(done) {
    var options = {
        method: "GET",
        url: "/"
    };
    server.inject(options, function(response) {
        Code.expect(response.statusCode).to.equal(200);
        Code.expect(response.result.slice(0,20)).to.equal(fs.readFileSync(__dirname + '/../public/index.html').toString().slice(0,20));
        done();
    });
});

lab.test("Picture endpoint", function(done) {
    var options = {
        method: "GET",
        url: "/view/test.jpg"
    };
    server.inject(options, function(response) {
        Code.expect(response.statusCode).to.equal(200);
        Code.expect(response.result).to.equal('<img src="https://s3.amazonaws.com/polagraph/test.jpg">');
        done();
    });
});

lab.test("Picture upload endpoint", function(done){
    var file = fs.readFileSync(__dirname + '/test.jpg');
    var options = {
        method: "POST",
        url: "/upload",
        payload: {upload: file},
    };

    var thing = testReqAndRes(options);

    handlers["POST /upload"].apply(null, thing);
    assert.ok(thing[1].statusCode, 200);
    done();
});

function testReqAndRes(options){
    var request = new stream.Readable();
    for (var key in options){
        request[key] = options[key];
    }
    if(options.body){
        request.push(options.body);
        request.push(null);
    }
    var reqAndRes = [request, new http.ServerResponse(request)];
    return reqAndRes;
}
