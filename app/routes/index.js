const CacheController = require('../controllers/cache.controller');

module.exports.init = function (app) {
    app.get('/cache', CacheController.listAll);
}