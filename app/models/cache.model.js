const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./app/config/localDb.json', 'utf-8'));

// This method takes care of the overwrtitng functionality
const checkAndReplaceRecord = async function(next) {
	const self = this;
	self.modifiedAt = new Date();
	if (!self.isNew) return next();
	self.model('Cache').count({}, async function(err, count) {
		//check for the record that has been least modified and replace
		if (count + 1 > config.cache.maxLimit) {
			await self.model('Cache')
				.findOne({}, {
					_id: 1
				})
				.sort({
					modifiedAt: 1
				}).exec(async function(err, cache) {
					self.isNew = false;
					self._id = cache._id;
					self.createdAt = new Date();
					self.modifiedAt = new Date();
					next();
				});
		} else {
			next();
		}
	});
};

const CacheSchema = new Schema({
	key: {
		type: String,
		trim: true,
		index: true
	},
	ttl: {
		type: Number,
		default: 86400 // default 1 day
	},
	content: {
		type: String,
		default: (Math.random() + 1).toString(36).substring(7) //will generate a random string
	},
	modifiedAt: {
		type: Date,
		default: Date.now,
		index: true
	},
	createdAt: {
		type: Date,
		default: Date.now,
		index: true
	}
}, {
	collection: 'cache'
});

CacheSchema.pre('save', checkAndReplaceRecord);

module.exports = mongoose.model('Cache', CacheSchema);
