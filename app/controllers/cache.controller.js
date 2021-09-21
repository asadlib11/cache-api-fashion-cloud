const cacheService = require("../services/cache.service");

const listAll = async(req, res) => {
    try {
        const keys = await cacheService.listAll();
        if((keys).length === 0) {
            return res.status(404).send("No keys found");
        }
        return res.status(200).send(keys);
    } catch (err) {
        res.status(400).send("Unexpected error occurred, Error: ", err);
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
        res.status(400).send("Unexpected error occurred, Error: ", err);
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
        res.status(400).send("Unexpected error occurred, Error: ", err);
    }
}

module.exports = {
    listAll,
    getCache,
    createOrUpdateCache
}