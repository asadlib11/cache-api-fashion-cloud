const mongoose = require('mongoose');
const fs = require('fs');
const models = require('../models');

let config = JSON.parse(fs.readFileSync('./app/config/localDb.json', 'utf-8'));
let testConfig = JSON.parse(fs.readFileSync('./app/config/testDb.json', 'utf-8'));

const connectToDatabase = async () => {
    config = (process.env.APP_ENV === 'test') ? testConfig : config;
    await mongoose.connect(config.mongodb.url)
        .then(async () =>{
            console.info("Connected to MongoDB");
            if (config.mongodb.seed) {
                await seedDatabase();
            }
        })
        .catch(err => console.error('Could not connect to MongoDB', err));
}

const seedDatabase = async () => {
    console.info('Seeding database');
    console.info("Removing all data from db");
    await models.Cache.remove({}).exec(function(err) {
        console.log('database seeded');
    });
}

module.exports = {
    connectToDatabase
};
