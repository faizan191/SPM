const mongoose = require('mongoose');

const MentorProjectSchema = new mongoose.Schema({

	mentor   : {
		type     : String,
		required : true
	},
	title    : {
		type     : String,
		required : true
	},
    level:{
        type: String,
        require:true 
    },
	deadline : {
		type     : String,
		required : true
	},
    lastDate : {
		type     : String,
		required : true
	}
});

const MentorProject = mongoose.model('MentorProject', MentorProjectSchema);

module.exports = MentorProject;
