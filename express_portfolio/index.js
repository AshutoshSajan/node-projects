var express = require("express");
var path = require("path");
var app = express();
var fs = require('fs');
 
app.use((req,res, next) => {
	res.status(200);
	next();
})

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,"Public")));

app.set("views", path.join(__dirname,"views"));

app.set("view engine", "ejs");

app.get('/', (req, res) => {
	res.render('index.ejs');
})

app.get('/about', (req, res) => {
	res.render('about.ejs');
})

app.get('/contact', (req, res) => {
	res.render('contact.ejs');
})

app.get('/project', (req, res) => {
	res.render('project.ejs');
})

app.get('/skills', (req, res) => {
	res.render('skills.ejs');
})

app.post('/contact', (req, res) => {
	console.log(req.body);
	res.end()
})

app.listen(4000, ()=>{
	console.log('server is runing at port: 4000')
})

