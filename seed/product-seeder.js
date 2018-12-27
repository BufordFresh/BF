var Product = require('../models/product');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://localhost/mydatabase';

var resultArray = [];
mongo.connect(url, { useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    var db = client.db('mydatabase');
    var cursor = db.collection('groceries').find({ "name": { "$exists": true } }).sort({'name': 1});
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    });
});

var products = [];
for (var i = 0; i < resultArray.length; i++) {
    products.push(new Product({
        imagePath: resultArray[i].pic,
        name: resultArray[i].name,
        price: resultArray[i].price
    }));
}

var done = 0;
for (var i = 0; i < products.length; i++) {
    products[i].save(function(err, result) {
        done++;
        if (done == products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}