module.exports = {
    "auth": {
        "urls": {
            "failureRedirect": "/login",
            "successRedirect": "/on-login",
            "failureFlash": true
        },
        "google": {
            "provider": "google",
            "password": "123456",
            "isSecure": false,
            "clientId": process.env.GOOGID,
            "clientSecret": process.env.GOOGSECRET
        }
    },
    "session": {
        "cookieOptions": {
            "password": "abcdef",
            "isSecure": false
        }
    }
};
