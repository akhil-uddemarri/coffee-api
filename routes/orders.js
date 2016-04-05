var express = require('express');
var router = express.Router();
var orderLogic = require('../logic/orders.logic');

router.route('/orders')
    .get(function(req, res) {
        var offset = (typeof req.query.offset !== 'undefined') ? +req.query.offset : null;
        var limit = (typeof req.query.limit !== 'undefined') ? +req.query.limit : null;
        var baseUri = req.protocol + '://' + req.get('host');

        console.log(offset, limit)


        if(offset > -1 && limit > -1) {
            res.append('X-Total-Count', orderLogic.getOrderCount());
            res.append('Link', orderLogic.getPaginationLinks(offset, limit, baseUri));
        }

        res.send(orderLogic.getAllOrders(offset, limit));
    })
    .post(function(req, res) {
        var newOrder = {
            userId: req.body.userId,
            products: req.body.products
        };
        var baseUri = req.protocol + '://' + req.get('host');
        var order = orderLogic.addOrder(newOrder);

        res.location(baseUri + '/orders/' + order.id);
        res.status(201);
        res.send(order);
    });

router.route('/orders/:id')
    .get(function(req, res) {
        var order = orderLogic.getOrder(req.params.id);
        res.send(order);
    });

router.route('/orders/:id/status')
    .get(function(req, res) {
        var orderStatus = orderLogic.getOrderStatus(req.params.id);
        res.send(orderStatus);
    })
    .put(function(req, res) {
        var updatedStatus = orderLogic.updateOrderStatus(req.params.id, req.body.status);
        res.send(updatedStatus);
    });


module.exports = router;
