const mongoose = require('mongoose');
const fs = require('fs');

let config = JSON.parse(fs.readFileSync('./app/config/localDb.json', 'utf-8'));
let testConfig = JSON.parse(fs.readFileSync('./app/config/testDb.json', 'utf-8'));

const connectToDatabase = async () => {
    config = (process.env.APP_ENV === 'test') ? testConfig : config;
    await mongoose.connect(config.mongodb.url)
        .then(async () =>{
            console.info("Connected to MongoDB")
        })
        .catch(err => console.error('Could not connect to MongoDB', err));
}

module.exports = {
    connectToDatabase
};
