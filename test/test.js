var supertest = require('supertest');
var should = require('should');
var config = require('../config');
var productsData = require('../data/products.json');
var ordersData = require('../data/orders.json');

var server = supertest.agent('http://localhost:' + config.port);


describe('Coffee API', function() {

    it('should allow a customer to view products', function(done) {
        server.get('/products')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if(err) {
                    done(err);
                }

                res.body.should.deepEqual(productsData);

                done();
            });
    });

    it('should allow a customer to order 1 or more drinks', function(done) {
        server.post('/orders')
            .set('Content-Type', 'application/json')
            .send({
                "userId": 1,
                "products": [10, 14]
            })
            .expect(201)
            .expect('location', /orders\//)
            .end(function(err, res) {
                if(err) {
                    done(err);
                }

                res.body.id.should.exist;
                res.body.status.should.equal('created');
                res.body.userId.should.equal(1);
                res.body.products.should.deepEqual([10, 14]);

                done();
            })
    });

    it('should allow a customer to check the status of their order', function(done) {
        server.get('/orders/1/status')
            .set('Content-Type', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if(err) {
                    done(err);
                }

                res.body.status.should.equal('created');

                done();
            });
    });

    it('should allow a barista to add new items to menu', function(done) {
        server.post('/products')
            .send({
                "name": "Mocha",
                "category": "Coffee",
                "size": "Medium",
                "price": "5:00"
            })
            .expect(201)
            .expect('location', /products\//)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if(err) {
                    done(err);
                }

                res.body.should.containDeep({
                    "name": "Mocha",
                    "category": "Coffee",
                    "size": "Medium",
                    "price": "5:00"
                });

                done();
            });
    });

    it('should allow a barista to update order status', function(done) {
        server.put('/orders/1/status')
            .set('Content-Type', 'application/json')
            .send({ status: 'preparing'})
            .expect(200)
            .end(function(err, res) {
                if(err) {
                    done(err);
                }

                res.body.status.should.equal('preparing');

                done();
            });
    });

    it('should allow a barista to view all orders', function(done) {
        server.get('/orders')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if(err) {
                    done(err);
                }

                res.body.length.should.exist;

                done();
            });
    });

    it('should allow a barista to page through orders', function(done) {
        server.get('/orders?offset=2&limit=1')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect('X-Total-Count', 4)
            .end(function(err, res) {
                if(err) {
                    done(err);
                }

                res.body.length.should.equal(1);

                done();
            });
    });
});
