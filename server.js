const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const port = process.env.PORT || 8000;
const view_path = path.join(__dirname, './resources/views');

app.use(express.static('public'));

/* set the template engine */
app.set('view engine', 'ejs');
app.set('views', view_path);

app.get('/', (req, res) => {
   res.render('home');
   // res.end();
});

app.get('/cart', (req, res) => {
   res.render('customers/cart');
});

app.get('/login', (req, res) => {
   res.render('auth/login');
});

app.get('/register', (req, res) => {
   res.render('auth/register');
});

app.listen(port, (e) => {
   console.log(`listning on port ${port}`);
});
