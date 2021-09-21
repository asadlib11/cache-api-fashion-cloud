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

module.exports = {
    listAll,
    getCache
}