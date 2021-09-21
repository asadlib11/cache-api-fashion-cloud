const cacheService = require("../services/cache.service");

const listAll = async(req, res) => {
    try {
        const keys = await cacheService.listAll();
        if((keys).length === 0) {
            return res.status(404).send("No keys found");
        }
        return res.status(200).send(keys);
    } catch (err) {
        res.status(500).send("Unexpected error occurred, Error: ", err);
    }
}

const getCache = async(req, res) => {
    try {
        const key = req.params.key;
        let cache = await cacheService.getCache(key);

        res.status(200).send({
            message: cache.message,
            data: cache.content
        });
    } catch (err) {
        res.status(500).send("Unexpected error occurred, Error: ", err);
    }
}

const createOrUpdateCache = async (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            message: 'Bad request: Parameter content is required'
        });
    }
    try {
        const key = req.params.key;
        const { content } = req.body;
        await cacheService.createOrUpdateCache(key, content);
        res.status(200).send({
            message: 'Content has been successfully added in db.',
            data: content
        });
    } catch (err) {
        res.status(500).send("Unexpected error occurred, Error: ", err);
    }
}

const deleteCache = async (req, res) => {
    try {
        const key = req.params.key;
        const result = await cacheService.deleteCache(key);
        const message = (result.deletedCount > 0) ? `Cache at Key ${key} has been deleted successfully` : `No Cache found at key ${key}`
        const status = (result.deletedCount > 0) ? 200 : 404;
        res.status(status).send({
            message
        });
    } catch (err) {
        res.status(500).send("Unexpected error occurred, Error: ", err);
    }
}

const deleteAllCache = async (req, res) => {
    try {
        const result = await cacheService.deleteAllCache();
        const message = (result.deletedCount > 0) ? 'All cache keys have been deleted successfully' : 'No Cache keys found';
        const status = (result.deletedCount > 0) ? 200 : 404;
        res.status(status).send({
            message
        });
    } catch (err) {
        res.status(500).send("Unexpected error occurred, Error: ", err);
    }
}

module.exports = {
    listAll,
    getCache,
    createOrUpdateCache,
    deleteCache,
    deleteAllCache
}