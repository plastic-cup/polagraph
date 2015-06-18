var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var assert = require('assert');
var userCollection = 'users';
var url = 'mongodb://localhost:27018/myproject';
var mongoHandlers = require('./mongoHandlers');

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

module.exports = mongo;
