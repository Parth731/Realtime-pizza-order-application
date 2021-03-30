const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const port = process.env.PORT || 8000;

const view_path = path.join(__dirname, './resources/views');

app.use(express.static('public'));

app.get('/', (req, res) => {
   res.render('home');
   // res.end();
});

/* set the template engine */
app.use(expressLayout);
app.set('views', view_path);
app.set('view engine', 'ejs');

app.listen(port, (e) => {
   console.log(`listning on port ${port}`);
});
