module.exports = {
    'GET /' : function(request, reply){
      reply.file('index.html');
    },

    'GET /{picture}' : function(request, reply){
      reply('<img src="https://s3.amazonaws.com/polagraph/' + request.params.picture + '">');
    },

    'POST /upload' : function (request, reply){
        var type = filetype((request.payload.upload));
        s3.putObject({
            Bucket : 'polagraph',
            Key : request.payload.title + '.' + type.ext,
            Body : request.payload.upload,
            ContentType : type.mime,
        }, function(err, data){
            console.log(data);
        });
    },

    'GET /static/{path*}' : {
        directory: {
            path: './',
        }
    }
};