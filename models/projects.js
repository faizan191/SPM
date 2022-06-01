const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
	roll   : {
		type     : String,
		required : true
	},
	mentor   : {
		type     : String,
		required : true
	},
	title    : {
		type     : String,
		required : true
	},
	deadline : {
		type     : String,
		required : true
	}
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
