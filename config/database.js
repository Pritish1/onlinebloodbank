var mongoose = require("mongoose");

module.exports = {
	connect: function() {
		mongoose.connect('mongodb://pritish:pritish@ds119014.mlab.com:19014/databasepritish');
	}
};