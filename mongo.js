var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/myproject';
var mongoHandlers = require('./mongohandlers');


MongoClient.connect(url, function(err, db){
    console.log(err, db);
});

var mongo = {};

mongo.insert = function(collection, doc, callback){
    MongoClient.connect(url, function(err, db) {
      mongoHandlers.insertDocuments(collection, doc, db, function(err, data) {
        db.close();
        callback(null, data);
      });
    });
};

mongo.read = function(collection, query, callback){
    MongoClient.connect(url, function(err, db) {
      mongoHandlers.findDocuments(collection, query, db, function(err, data) {
          db.close();
          callback(null, data);
        });
    });
};

mongo.remove = function(collection, query, callback){
    MongoClient.connect(url, function(err, db) {
      mongoHandlers.removeDocuments(collection, query, db, function(err, data) {
        db.close();
        callback(null, data);
      });
    });
};

mongo.update = function(collection, query, upd){
    MongoClient.connect(url, function(err, db){
        db.collection(collection).update(query, upd);
        db.close();
    });
};

// mongo.read('users', {firstName : 'Daniel'}, function(err, data){
//     console.log(data);
// });

module.exports = mongo;
