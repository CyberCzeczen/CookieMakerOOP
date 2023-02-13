const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const {configuratorRouter} = require('./routes/configurator');
const {homeRouter} = require('./routes/home');
const {orderRouter} = require('./routes/order');
const {handlebarsHelpers} = require("./utils/handlebars-helpers");


class CookieMakerApp {
    constructor() {
        this._configureApp();
        this._setRoutes();
        this._run();
    }

    _configureApp() {
        this.app = express();

        this.app.use(express.static('public')); // http:/localhost:3000/ app starts in folder public
        this.app.use(cookieParser());
        this.app.engine('.hbs', hbs.engine({
            extname: '.hbs',
            helpers: handlebarsHelpers,
        }));
        this.app.set('view engine', '.hbs');
    }

    _setRoutes() {
        this.app.use('/', homeRouter);
        this.app.use('/configurator', configuratorRouter);
        this.app.use('/order', orderRouter);
    }

    _run() {
        this.app.listen(3000, 'localhost', () => {
            console.log(`Listening on http://localhost:3000`);
        });
    }
}

new CookieMakerApp();