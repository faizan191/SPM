const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
app.use(express.static(__dirname + '/public'));

const Project = require('./models/projects');

mongoose
	.connect('mongodb://localhost:27017/projectData', {
		useNewUrlParser    : true,
		useUnifiedTopology : true
	})
	.then((result) => {
		console.log("We'r connected");
	})
	.catch((err) => {
		console.log('OH NO not good');
		console.log(err);
	});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/',  (req, res) => {
	res.render('default/index.ejs');
});
app.get('/studentLogin',  (req, res) => {
	res.render('students/studentLogin.ejs');
});
app.get('/mentorLogin',  (req, res) => {
	res.render('projects/mentorLogin.ejs');
});
app.get('/adminLogin',  (req, res) => {
	res.render('admin/adminLogin.ejs');
});

app.get('/home', async (req, res) => {
	const projects = await Project.find({});
	res.render('projects/index.ejs', { projects });
});

app.get('/home/new', (req, res) => {
	res.render('projects/new');
});

app.post('/home', async (req, res) => {
	const newProject = new Project(req.body);
	await newProject.save();
	res.redirect(`/home/${newProject._id}`);
});

app.get('/home/:id', async (req, res) => {
	const { id } = req.params;
	const foundProject = await Project.findById(id);
	// console.log(foundProject);
	res.render('projects/show', { foundProject });
});
app.get('/home/:id/edit', async (req, res) => {
	const { id } = req.params;
	const projectSearched = await Project.findById(id);
	res.render('projects/edit', { projectSearched });
});
app.put('/home/:id', async (req, res) => {
	const { id } = req.params;
	const projectUpdate = await Project.findByIdAndUpdate(id, req.body, { runValidators: true });
	// console.log(req.body);
	res.redirect(`/home/${projectUpdate._id}`);
});
app.delete('/home/:id', async (req, res) => {
	const { id } = req.params;
	const deletedProject = await Project.findByIdAndDelete(id);
	res.redirect('/home');
});

app.listen(3000, () => {
	console.log('App is Listening on PORT 3000');
});
