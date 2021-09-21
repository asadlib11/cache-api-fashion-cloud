const express = require('express');
const bodyParser = require('body-parser');
const database = require('./database');
const app = express();
const fs = require('fs');


// setting configrations for server
const appConfigurations = JSON.parse(fs.readFileSync('./app/config/app.json', 'utf-8'));
app.set('port', appConfigurations.app.port);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));


const server = app.listen(app.get('port'), async function() {
	console.info('Express server connected on port ' + server.address().port);
	
	//connecting to database
	await database.connectToDatabase();
});

module.exports = app;