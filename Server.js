const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
//To use a middleware we do
app.use(express.static(__dirname + '/public'));

app.use((req, res) => {
	res.render("maintenance.hbs");
})

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err){
			console.log('unable to append to server.log');
		}
	})
	next(); 
})

hbs.registerHelper('getCurrentYear', () => {
	return  new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
})

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		Message: 'welcome home'
	});
});

app.get('/home', (req,res) => {
	res.send('welcome, home');
}); 

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About page'
	});
});

//To return a JSON we do

app.get('/bad', (req, res) => {
	res.send({
		Error: 'bad request'
	});
});

app.listen(3000, () => {
	console.log('app is running on port 3000');
})