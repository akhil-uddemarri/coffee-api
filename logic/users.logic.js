var _ = require('lodash');
var _users = require('../data/users.json');

var _get = function(id) {
    return _.find(_users, function(u) {
        return u.id === id;
    });
};

var _add = function(newUser) {
    _users.push(newUser);
};

var _remove = function(id) {
    _.remove(_users, function(u) {
        return u.id === id;
    });
};

module.exports = {
    getUser: _get,
    addUser: _add,
    removeUser: _remove
};
