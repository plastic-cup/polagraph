var Code = require('code');
var Lab = require('lab');
var fs = require('fs');
var lab = exports.lab = Lab.script();
var server = require('../server');
var filetype = require('file-type');
var FormData = require('form-data');

lab.test("Main endpoint", function(done) {
    var options = {
        method: "GET",
        url: "/"
    };
    server.inject(options, function(response) {
        Code.expect(response.statusCode).to.equal(200);
        Code.expect(response.result).to.equal(fs.readFileSync(__dirname + '/../index.html').toString());
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

// lab.test("Picture upload endpoint", function(done) {
//     var formData = new FormData();
//     var file = fs.readFileSync(__dirname + '/test.jpg');
//     formData.append('title', 'test');
//     formData.append('upload', file);
//     formData.on('end', function(){
//         var options = {
//             method: "POST",
//             url: "/upload",
//             payload: formData,
//         };
//         server.inject(options, function(response) {
//             Code.expect(response.statusCode).to.equal(200);
//             Code.expect(response.result).to.equal('<img src="https://s3.amazonaws.com/polagraph/test.jpg">');
//             done();
//         });
//     });
// });
