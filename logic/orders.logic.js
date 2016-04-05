var _ = require('lodash');
var _ = require('lodash');
var _orders = require('../data/orders.json');

var _getAll = function(offset, limit) {
    if(offset !== null && typeof limit !== null) {
        var startIndex = +offset * +limit;
        var endIndex = startIndex + +limit;
        var p = _.slice(_orders, startIndex, _.min([endIndex, _orders.length]));
        return p;
    }
    return _orders;
};

var _get = function(id) {
    return _.find(_orders, function(o) {
        return o.id === +id;
    });
};

var _add = function(newOrder) {
    var order = _.extend({id: _orders.length + 1, status: 'created'}, newOrder);
    _orders.push(order);
    return order;
};

var _getOrderStatus = function(id) {
    return _.pick(_get(id), ['status']);
};

var _updateOrderStatus = function(id, status) {
    var order = _get(id);
    order.status = status;
    return _.pick(order, ['status']);
}

var _getCount = function() {
    return _orders.length;
};

var _getPaginationLinks = function(offset, limit, basePath) {
    var links = [];
    var totalCount = _getCount();

    if(offset < _.floor(totalCount/limit)) {
        links.push('<'+ basePath + '/orders?offset=' + (offset + 1) + '&limit=' + limit + '>; rel="next"');
        links.push('<'+ basePath + '/orders?offset=' + _.floor(totalCount/limit) + '&limit=' + limit + '>; rel="last"');
    }

    if(offset !== 0) {
        links.push('<'+ basePath + '/orders?offset=0&limit=' + limit + '>; rel="first"');
        links.push('<'+ basePath + '/orders?offset=' + (offset - 1) + '&limit=' + limit + '>; rel="prev"');
    }

    return links;
};

module.exports = {
    getAllOrders: _getAll,
    getOrder: _get,
    addOrder: _add,
    getOrderStatus: _getOrderStatus,
    getOrderCount: _getCount,
    getPaginationLinks: _getPaginationLinks,
    updateOrderStatus: _updateOrderStatus
};
