const mongoose = require('mongoose');
const fetch = require('node-fetch');
const Project = require('../models/projects');
mongoose
	.connect('mongodb://localhost:27017/projectData', {
		useNewUrlParser    : true,
		useUnifiedTopology : true
	})
	.then((result) => {
		console.log("Database is connected");
	})
	.catch((err) => {
		console.log('OH no!!!, some error might have occured');
		console.log(err);
	});

	// deleting existing data in the database
const seedDB = async () => {
	await Project.deleteMany({});
	
};


// seedDB();


var dataArray = [];
var data = require('fs').readFileSync('./csvfile/project.csv', 'utf8');
const rows = data.split('\n');
rows.forEach((row) => {
	const column = row.split(',');
	const roll = column[0];
	const mentor = column[1];
	const title = column[2];
	const deadline = column[3];
	// console.log(deadline);
	dataArray.push({ roll: roll, mentor: mentor, title: title, deadline: deadline });
});
// console.log(dataArray);
Project.insertMany(dataArray)
	.then((res) => {
		console.log(res);
	})
	.catch((e) => {
		console.log(e);
	});
