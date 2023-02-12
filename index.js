const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const {configuratorRouter} = require('./routes/configurator');
const {homeRouter} = require('./routes/home');
const {orderRouter} = require('./routes/order');
const {handlebarsHelpers} = require("./utils/handlebars-helpers");

const app = express();

app.use(express.json());
app.use(express.static('public')); // http:/localhost:3000/ app starts in folder public
app.use(cookieParser());
app.engine('.hbs', hbs.engine({
    extname: '.hbs',
    helpers: handlebarsHelpers,
}));
app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/configurator', configuratorRouter);
app.use('/order', orderRouter);

app.listen(3000, 'localhost', () => {
    console.log(`Listening on http://localhost:3000`);
});

