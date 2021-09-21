const models = require('../models');
const crypto = require("crypto");

const listAll = async () => {
    return await models.Cache.find();
}

const getCache = async (key) => {
    let cache = await models.Cache.findOne({ key });
    let message = '';
    if (cache) {
        if (Date.parse(cache.modifiedAt) + (cache.ttl * 1000) < Date.now()) {
            cache.content = crypto.randomBytes(20).toString('hex');
            await cache.save();
            message = 'Cache miss'
        } else {
            message = 'Cache hit';
        }
    } else {
        cache = await models.Cache.create({
            key,
            content: crypto.randomBytes(20).toString('hex')
        });
        message = 'Cache miss';
    }

    return {
        message,
        content: cache.content
    };
}

const createOrUpdateCache = async (key, content) => {
    let cache = await models.Cache.findOne({ key });
    if (cache) {
        cache.content = content;
        cache.modifiedAt = new Date();
        await cache.save();
    } else {
        cache = models.Cache.create({
            key,
            content
        });
    }
}

module.exports = {
    listAll,
    getCache,
    createOrUpdateCache
}