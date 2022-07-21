import path from 'path';
import express from 'express';
import session from 'express-session';
import {create} from 'express-handlebars';
import routes from './controllers';
import helpers from './utils/helpers'; // THIS MAY NOT WORK

import sequelize from './config/connection';
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = create({ helpers }); // THIS MAY NOT WORK

const sessionConfig: session.SessionOptions = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 180000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sessionConfig));
// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// app.set('views', '../views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



app.use(routes);

sequelize.addModels([path.join(__dirname, '/**/*.model.{ts,js}')]);
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});