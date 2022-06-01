const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const AppError = require('./utils/ExpressError')
const catchAsync = require('./utils/catchAsync')
app.use(express.static(__dirname + '/public'));

const Project = require('./models/projects');
const { wrap } = require('module');

mongoose
	.connect('mongodb://localhost:27017/projectData', {
		useNewUrlParser    : true,
		useUnifiedTopology : true
	})
	.then((result) => {
		console.log("Database connected");
	})
	.catch((err) => {
		console.log('OH NO!!!!, something might have happend');
		console.log(err);
	});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


function wrapAsync(fn){
	return function(req,res,next){
		fn(req,res,next).catch(e => next(e))
	}
}

app.get('/',  (req, res) => {
	res.render('home');
});
app.get('/studentLogin',  (req, res) => {
	res.render('logins/studentLogin.ejs');
});
app.get('/studentHome', (req, res) => {
	res.render('students/home')
});
app.get('/studentHome/newProjects', (req, res) => {
	res.render('students/newProjects')
});
app.get('/studentHome/myProjects', (req, res) => {
	res.render('students/myProjects')
});
app.get('/mentorLogin',  (req, res) => {
	res.render('logins/mentorLogin.ejs');
});
app.get('/mentorHome', (req, res) => {
	res.render('mentor/home')
});
app.get('/adminLogin',  (req, res) => {
	res.render('logins/adminLogin.ejs');
});

app.get('/home',  async (req, res,next) => {

	try {
		const projects = await Project.find({});
		res.render('projects/allProjects', { projects });
	} catch (e) {
		next(e);
	}
	
})

app.get('/home/new',  (req, res, next) => {
	res.render('projects/new');
});

app.post('/home', async (req, res, next) => {
	try {
		const newProject = new Project(req.body.project);
		await newProject.save();
		res.redirect(`/home/${newProject._id}`);

	} catch (e) {
		next(e);
	}
	
});




app.get('/home/:id',  async (req, res,next) => {
	
	try {
		const { id } = req.params;
		const foundProject = await Project.findById(id);
		if(!foundProject){
			return next(new AppError('project Not found',404));
		}
		res.render('projects/show', { foundProject });
	} catch (e) {
		next(e);
	}
	
})

app.get('/home/:id/edit', async (req, res, next) => {
	try {
		const { id } = req.params;
		const projectSearched = await Project.findById(id);
		res.render('projects/edit', { projectSearched });
	} catch (e) {
		next(e);
	}


})

app.put('/home/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const projectUpdate = await Project.findByIdAndUpdate(id, {...req.body.project});
		res.redirect(`/home/${projectUpdate._id}`);
	} catch (e) {
		next(e);
	}


});

app.delete('/home/:id', async (req, res,next) => {

		try {
			const { id } = req.params;
			const deletedProject = await Project.findByIdAndDelete(id);
			res.redirect('/home');
		} catch (e) {
			next(e);
		}

})

app.get('/mentorHome/add', (req, res) => {
	res.render('mentor/add')
});


app.use((err,req,res,next) => {
	// const {status = 500,message= "something is wrong"} = err;
	// res.status(status).send(message);
	res.send('oh boy!!! errrorrrrrr')
});


app.listen(8080, () => {
	console.log('App is Listening on PORT 8080');
})
