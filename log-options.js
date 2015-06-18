var options = {
    reporters : [
        {
            reporter : require('good-file'),
            events : { response : "*" },
            config : "./our-log"
        },
        {
            reporter : require('good-http'),
            events : { request : "*" },
            config : {
                        endpoint : 'http://localhost:3000/analytics', // will change on heroku
                        threshold : 0,
                     }
        },
    ]
};

module.exports = options;
