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
const auth_1 = __importDefault(require("../utils/auth"));
const models_1 = __importDefault(require("../models"));
// Route to render homepage
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get all projects and JOIN with user data
        const postData = yield models_1.default.Post.findAll({
            include: [
                {
                    model: models_1.default.User,
                    attributes: ['name'],
                },
            ],
        });
        // Serialize data so the template can read it
        const posts = postData.map((project) => project.get({ plain: true }));
        console.log(posts);
        // Pass serialized data and session flag into template
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// Route to a render a single post and its associated comments
router.get('/post/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get a single post and JOIN with user and comment data
    try {
        const postData = yield models_1.default.Post.findByPk(req.params.id, {
            include: [
                models_1.default.User,
                {
                    model: models_1.default.Comment,
                    attributes: ['comment', 'author', 'date_created'],
                }
            ],
        });
        let post;
        if (postData) {
            post = postData.get({ plain: true });
        }
        // Pass serialized data and session flag into template
        res.render('post', Object.assign(Object.assign({}, post), { logged_in: req.session.logged_in }));
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// Use withAuth middleware to prevent access to route
router.get('/dashboard', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the logged in user based on the session ID
        const userData = yield models_1.default.User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: models_1.default.Post }],
        });
        let user;
        if (userData) {
            user = userData.get({ plain: true });
        }
        res.render('dashboard', Object.assign(Object.assign({}, user), { logged_in: true }));
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});
router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('signup');
});
exports.default = router;
