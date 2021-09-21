const CacheController = require('../controllers/cache.controller');

module.exports.init = function (app) {
    app.get('/cache', CacheController.listAll);
    app.get('/cache/:key', CacheController.getCache);
    app.post('/cache/:key', CacheController.createOrUpdateCache);
    app.put('/cache/:key', CacheController.createOrUpdateCache);
    app.delete('/cache/:key', CacheController.deleteCache);
}