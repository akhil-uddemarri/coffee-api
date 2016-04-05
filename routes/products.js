var express = require('express');
var router = express.Router();
var productLogic = require('../logic/products.logic');

router.route('/products')
    .get(function(req, res) {
        res.send(productLogic.getAllProducts());
    })
    .post(function(req, res) {
        var newProduct = {
            name: req.body.name,
            category: req.body.category,
            size: req.body.size,
            price: req.body.price
        };
        var baseUri = req.protocol + '://' + req.get('host');
        var product = productLogic.addProduct(newProduct);

        res.location(baseUri + '/products/' + product.id);
        res.status(201);
        res.send(product);
    });


module.exports = router;
