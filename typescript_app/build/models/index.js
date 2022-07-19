"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_model_1 = __importDefault(require("./User.model"));
const Post_model_1 = __importDefault(require("./Post.model"));
const Comment_model_1 = __importDefault(require("./Comment.model"));
exports.default = { User: User_model_1.default, Post: Post_model_1.default, Comment: Comment_model_1.default };
