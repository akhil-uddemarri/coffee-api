var _ = require('lodash');
var _ = require('lodash');
var _products = require('../data/products.json');

var _getAll = function() {
    return _products;
};

var _get = function(id) {
    return _.find(_products, function(p) {
        return p.id === id;
    });
};

var _add = function(newProduct) {
    var product = _.extend({id: _products.length + 1}, newProduct);
    _products.push(product);
    return product;
};

var _remove = function(id) {
    _.remove(_products, function(p) {
        return p.id === id;
    });
};

module.exports = {
    getAllProducts: _getAll,
    getProduct: _get,
    addProduct: _add,
    removeProduct: _remove
};
