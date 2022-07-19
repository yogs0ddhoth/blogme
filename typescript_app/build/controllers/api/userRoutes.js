"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router();
const models_1 = __importDefault(require("../../models"));
// create user
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield models_1.default.User.create(req.body);
        // save user data to session
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.user_name = userData.name;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
// login user
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield models_1.default.User.findOne({ where: { email: req.body.email } });
        // email validation
        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }
        // password validation
        const validPassword = yield userData.checkPassword(req.body.password);
        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }
        // save user information to session
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.user_name = userData.name;
            req.session.logged_in = true;
            res.json({ user: userData, message: 'You are now logged in!' });
        });
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
// logout user
router.post('/logout', (req, res) => {
    // only work if the user is logged in
    if (req.session.logged_in) {
        // clear session
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});
exports.default = router;
