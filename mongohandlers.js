var mongoHandlers = {};

mongoHandlers.insertDocuments = function(collection, doc, db, callback) {
  db.collection(collection).insert(doc, function(err, data) {
    callback(null, data);
  });
};

mongoHandlers.findDocuments = function(collection, query, db, callback) {
  db.collection(collection).find(query).toArray(function(err, data) {
    callback(null, data);
  });
};

mongoHandlers.removeDocuments = function(collection, query, db, callback) {
  db.collection(collection).remove(query, function(err, data) {
    callback(null, data);
  });
};

module.exports = mongoHandlers;
