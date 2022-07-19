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
const auth_1 = __importDefault(require("../../utils/auth"));
const models_1 = __importDefault(require("../../models"));
// create a post
router.post('/', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    try {
        const newPost = yield models_1.default.Post.create(Object.assign(Object.assign({}, req.body), { user_id: req.session.user_id }));
        res.status(200).json(newPost);
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
// add a comment to the associated project
router.post('/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(Object.assign(Object.assign({}, req.body), { author_id: req.session.user_id, project_id: req.params.id }));
        const newComment = yield models_1.default.Comment.create(Object.assign(Object.assign({}, req.body), { author: req.session.user_name, author_id: req.session.user_id, post_id: req.params.id }));
        console.log(newComment);
        res.status(200).json(newComment);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// todo: add elements and script to edit comments on the front end
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = yield models_1.default.Comment.update({ comment: req.body.comment }, { where: { id: req.params.id } });
        // const update = await Comment.findByPk(req.params.id);
        // update.comment = req.body.comment;
        // await update.save();
        const updatedComment = yield models_1.default.Comment.findByPk(req.params.id);
        res.status(200).json(updatedComment);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// delete operation
router.delete('/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // delete post
        const postData = yield models_1.default.Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!postData) {
            res.status(404).json({ message: 'No project found with this id!' });
            return;
        }
        res.status(200).json(postData);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
exports.default = router;
