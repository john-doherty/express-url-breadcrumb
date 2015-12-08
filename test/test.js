var express = require('express'),
    request = require('supertest'),
    assert = require('assert'),
    breadcrumb = require('../lib/breadcrumb.js');

describe('breadcrum middleware', function(){
  
  it('should return an item for each url segment',function(done){
    
    // create an express app
    var app = express(),
        url = '/really/long/url/with/lots/of/segments';
    
    // hook up breadcrumb middleware
    app.use(breadcrumb());
    
    // route with middleware
    app.get(url, function(req, res){
      assert.equal(req.app.locals.breadcrumb.length, 8);
      res.status(200).end();
    });
    
    // execute the request
    request(app).get(url).expect(200, done);
  });
  
  it('should execute modifer for each item in the breadcrumb',function(done){
    
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
  
  it('should modify items via modifier',function(done){
    
    // create an express app
    var app = express(),
        url = '/really/long/url/with/lots/of/segments',
        iterations = 0;

    var modifier = function(item){
      item.label = iterations;
      iterations++; 
    };
    
    // hook up breadcrumb middleware
    app.use(breadcrumb(modifier));
    
    // route with middleware
    app.get(url, function(req, res){
      
      assert.equal(req.app.locals.breadcrumb[0].label, 0);
      assert.equal(req.app.locals.breadcrumb[1].label, 1);
      assert.equal(req.app.locals.breadcrumb[2].label, 2);
      assert.equal(req.app.locals.breadcrumb[3].label, 3);
      assert.equal(req.app.locals.breadcrumb[4].label, 4);
      assert.equal(req.app.locals.breadcrumb[5].label, 5);
      assert.equal(req.app.locals.breadcrumb[6].label, 6);
      assert.equal(req.app.locals.breadcrumb[7].label, 7);
      
      res.status(200).end();
    });
    
    // execute the request
    request(app).get(url).expect(200, done);
  });
  
  it('should convert label case using modifier',function(done){
    
    // create an express app
    var app = express(),
        url = '/really/long/url/with/lots/of/segments',
        iterations = 0;

    var modifier = function(item){
      item.label = item.label.toUpperCase();
      iterations++; 
    };
    
    // hook up breadcrumb middleware
    app.use(breadcrumb(modifier));
    
    // route with middleware
    app.get(url, function(req, res){

      assert.equal(req.app.locals.breadcrumb[0].label, 'HOME');      
      assert.equal(req.app.locals.breadcrumb[1].label, 'REALLY');
      assert.equal(req.app.locals.breadcrumb[2].label, 'LONG');
      assert.equal(req.app.locals.breadcrumb[3].label, 'URL');
      assert.equal(req.app.locals.breadcrumb[4].label, 'WITH');
      assert.equal(req.app.locals.breadcrumb[5].label, 'LOTS');
      assert.equal(req.app.locals.breadcrumb[6].label, 'OF');
      assert.equal(req.app.locals.breadcrumb[7].label, 'SEGMENTS');
      
      res.status(200).end();
    });
    
    // execute the request
    request(app).get(url).expect(200, done);
  });
  
});