process.env.APP_ENV = 'test';
const app = require('../app');
const crypto = require("crypto");
const request = require('supertest');
const should = require('should');
const _ = require('lodash');

describe('Cache', async function() {
	const url = "/cache/1";
	it('Adds new cache in list', (async function () {
		const data = {
			content: crypto.randomBytes(20).toString('hex')
		}
		const res = await request(app)
            .post(url)
            .send(data)
            .set('Accept', 'application/json');
    	res.statusCode.should.equal(200);
		res.body.message.should.equal('Content has been successfully added in db.');
		res.body.data.should.equal(data.content);
	}));

	it('Should not add an entry if content is missing', (async function () {
		const res = await request(app)
            .post(url)
            .set('Accept', 'application/json');
		res.statusCode.should.equal(400);
		res.body.message.should.equal('Bad request: Parameter content is required');
	}));

	it('Should update content when provided against a key', (async function () {
		const data = {
			content: "UpdatedContent"
		}
		const res = await request(app)
	        .post(url)
	        .send(data)
	        .set('Accept', 'application/json');
		res.statusCode.should.equal(200);
		res.body.message.should.equal('Content has been successfully added in db.');
		res.body.data.should.equal(data.content);
	}));

	it('Get a key that exists in Cache', (async function () {
		const res = await request(app)
        	.get(url)
        	.set('Accept', 'application/json');
		res.statusCode.should.equal(200);
		res.body.message.should.equal('Cache hit');
		res.body.data.should.equal('UpdatedContent');
	}));

	it('Should create a key in cache if it is accessed but doesnot exists', (async function () {
		const res = await request(app)
            .get('/cache/4')
            .set('Accept', 'application/json');
		res.statusCode.should.equal(200);
		res.body.message.should.equal('Cache miss');
		should.exists(res.body.data); //random String
	}));

	it('Should get all keys from Cache', (async function () {
		const res = await request(app)
        	.get('/cache')
        	.set('Accept', 'application/json');
	    res.statusCode.should.equal(200);
	    res.body.length.should.equal(2);
	}));

	it('Should delete a key when key is provided', (async function () {
		const res = await request(app)
        	.delete('/cache/1')
        	.set('Accept', 'application/json');
		res.statusCode.should.equal(200);
		res.body.message.should.equal('Cache at Key 1 has been deleted successfully');
	}));

	it('Should provide 404 error as key has already been deleted', (async function () {
		const res = await request(app)
        	.delete('/cache/1')
        	.set('Accept', 'application/json');
		res.statusCode.should.equal(404);
		res.body.message.should.equal('No Cache found at key 1');
	}));

	it('Deletes all keys', (async function () {
	    const res = await request(app)
	        .delete('/cache')
	        .set('Accept', 'application/json');
	    res.statusCode.should.equal(200);
    	res.body.message.should.equal('All cache keys have been deleted successfully');
	}));

	it('should provide 404 error as all keys have been deleted', (async function () {
	    const res = await request(app)
           	.delete('/cache')
            .set('Accept', 'application/json');
	    res.statusCode.should.equal(404);
	    res.body.message.should.equal("No Cache keys found");
	}));


	it('should provide 404 when fetching all Caches', (async function () {
    	res = await request(app)
           	.get('/cache')
            .set('Accept', 'application/json');
	    res.statusCode.should.equal(404);
	    res.error.text.should.equal("No keys found");
	}));

});
