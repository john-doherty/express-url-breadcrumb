var express = require('express');
var request = require('supertest');
var assert = require('assert');
var breadcrumb = require('../lib/breadcrumb.js');

describe('express-url-breadcrumb', function(){
  
  it('Should return an item for each url segment',function(done){
    
    // create an express app
    var app = express(),
        url = '/really/long/url/with/lots/of/segments';
    
    // hook up breadcrumb middleware
    app.use(breadcrumb());
    
    // route with middleware
    app.get(url, function(req, res){
      assert.equal(res.locals.breadcrumb.length, 8);
      res.status(200).end();
    });
    
    // execute the request
    request(app).get(url).expect(200, done);
  });
  
  it('Should execute modifier for each breadcrumb item',function(done){
    
    // create an express app
    var app = express(),
        url = '/really/long/url/with/lots/of/segments',
        iterations = 0;

    var modifier = function(item){
      iterations++;
    };
    
    // hook up breadcrumb middleware
    app.use(breadcrumb(modifier));
    
    // route with middleware
    app.get(url, function(req, res){
      assert.equal(iterations, 8);
      res.status(200).end();
    });
    
    // execute the request
    request(app).get(url).expect(200, done);
  });
  
  it('Should modify items via modifier',function(done){
    
    // create an express app
    var app = express(),
        url = '/really/long/url/with/lots/of/segments';

    var modifier = function(item, index){
      item.label = index;
    };
    
    // hook up breadcrumb middleware
    app.use(breadcrumb(modifier));
    
    // route with middleware
    app.get(url, function(req, res){
      
      assert.equal(res.locals.breadcrumb[0].label, 0);
      assert.equal(res.locals.breadcrumb[1].label, 1);
      assert.equal(res.locals.breadcrumb[2].label, 2);
      assert.equal(res.locals.breadcrumb[3].label, 3);
      assert.equal(res.locals.breadcrumb[4].label, 4);
      assert.equal(res.locals.breadcrumb[5].label, 5);
      assert.equal(res.locals.breadcrumb[6].label, 6);
      assert.equal(res.locals.breadcrumb[7].label, 7);
      
      res.status(200).end();
    });
    
    // execute the request
    request(app).get(url).expect(200, done);
  });
  
  it('Should convert label case using modifier',function(done){
    
    // create an express app
    var app = express(),
        url = '/really/long/url/with/lots/of/segments';

    var modifier = function(item, index){
      item.label = item.label.toUpperCase();
    };
    
    // hook up breadcrumb middleware
    app.use(breadcrumb(modifier));
    
    // route with middleware
    app.get(url, function(req, res){

      assert.equal(res.locals.breadcrumb[0].label, 'HOME');      
      assert.equal(res.locals.breadcrumb[1].label, 'REALLY');
      assert.equal(res.locals.breadcrumb[2].label, 'LONG');
      assert.equal(res.locals.breadcrumb[3].label, 'URL');
      assert.equal(res.locals.breadcrumb[4].label, 'WITH');
      assert.equal(res.locals.breadcrumb[5].label, 'LOTS');
      assert.equal(res.locals.breadcrumb[6].label, 'OF');
      assert.equal(res.locals.breadcrumb[7].label, 'SEGMENTS');
      
      res.status(200).end();
    });
    
    // execute the request
    request(app).get(url).expect(200, done);
  });
  
});