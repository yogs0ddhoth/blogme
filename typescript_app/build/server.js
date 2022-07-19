"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const express_handlebars_1 = require("express-handlebars");
const controllers_1 = __importDefault(require("./controllers"));
const helpers_1 = __importDefault(require("./utils/helpers")); // THIS MAY NOT WORK
const connection_1 = __importDefault(require("./config/connection"));
const SequelizeStore = require('connect-session-sequelize')(express_session_1.default.Store);
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Set up Handlebars.js engine with custom helpers
const hbs = (0, express_handlebars_1.create)({ helpers: helpers_1.default }); // THIS MAY NOT WORK
const sessionConfig = {
    secret: 'Super secret secret',
    cookie: {
        maxAge: 180000,
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: connection_1.default
    })
};
app.use((0, express_session_1.default)(sessionConfig));
// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', '../views');
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(controllers_1.default);
connection_1.default.addModels([path_1.default.join(__dirname, '/**/*.model.{ts,js}')]);
connection_1.default.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
