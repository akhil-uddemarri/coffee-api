var fs = require('fs');
var _ = require('lodash');
var ROUTES_PATH = './routes/';

module.exports = function(app) {
    fs.readdir(ROUTES_PATH, function(err, files) {
        if(err) throw err;

        _.each(files, function(file) {
            if(file.match(/\.js$/)) {
                app.use('', require(ROUTES_PATH + file.replace('.js', '')));
            }
        });
    });
};
