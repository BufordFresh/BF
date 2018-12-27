var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var Product = require('../models/product');
var Cart = require('../models/cart');

var url = 'mongodb://localhost';

// Set the date we're counting down to
var nextDelivery = new Date("Jan 12, 2019 12:00:00").toDateString();

/* GET home page. */
router.get('/', function(req, res, next) {
  var resultArray = [];
  mongo.connect(url, { useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    var db = client.db('mydatabase');
    var cursor = db.collection('groceries').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      res.render('shop/index', { title: 'BufordFresh'
    , nextDelivery: nextDelivery, items: resultArray});
    });
  });
});

/* GET chinese home page. */
router.get('/ch', function(req, res, next) {
  var resultArray = [];
  mongo.connect(url, { useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    var db = client.db('mydatabase');
    var cursor = db.collection('chinesegroceries').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      res.render('shop/ch_index', { title: 'BufordFresh'
    , nextDelivery: nextDelivery, items: resultArray});
    });
  });
});

/* GET korean home page. */
router.get('/kr', function(req, res, next) {
  var resultArray = [];
  mongo.connect(url, { useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    var db = client.db('mydatabase');
    var cursor = db.collection('koreangroceries').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      res.render('shop/kr_index', { title: 'BufordFresh'
    , nextDelivery: nextDelivery, items: resultArray});
    });
  });
});

// router.get('/add-to-cart/:id', function(req, res, next) {
//   var productId = req.params.id;
//   var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

//   Product.findById(productId, function(err, product) {
//     if (err) {
//       return res.redirect('/');
//     }
//       console.log(productId);
//       console.log(product);
//       cart.add(product, product.id);
//       res.session.cart = cart;
//       console.log(req.session.cart);
//       res.redirect('/');
//   });
// });

module.exports = router;

