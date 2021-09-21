const models = require('../models');
const crypto = require("crypto");
const { model } = require('mongoose');

const listAll = async () => {
    return await models.Cache.find();
}

module.exports = {
    listAll
}