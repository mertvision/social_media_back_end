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
exports.getSinglePost = exports.deleteSinglePost = exports.updateSinglePost = exports.createNewPost = exports.getPosts = void 0;
const mysqlConnection_1 = require("../../connection/mysql/mysqlConnection");
const moment_1 = __importDefault(require("moment"));
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json("posts");
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            err: err.message
        });
    }
});
exports.getPosts = getPosts;
// Create New Post Controller
const createNewPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Post Description and Post Image
        const description = req.body.description;
        const image = req.body.image;
        const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const addNewPostQuery = "INSERT INTO posts(`description`, `image`, `user_id`, `created_at`) VALUES (?)";
        const addNewPostQueryValues = [description, image, user_id, (0, moment_1.default)(Date.now()).format("YYYY-MM-DD HH:mm:ss")];
        mysqlConnection_1.mysqlDatabase.query(addNewPostQuery, [addNewPostQueryValues], (postError, postResult) => {
            if (postError) {
                console.log(postError);
            }
            else if (postResult) {
                return res.status(201).json({
                    success: true,
                    message: "Post has been created."
                });
            }
            ;
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            err: err.message
        });
    }
});
exports.createNewPost = createNewPost;
const updateSinglePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json("update");
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            err: err.message
        });
    }
});
exports.updateSinglePost = updateSinglePost;
const deleteSinglePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const postId = req.params.id;
        const user_id = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        const deleteSinglePostQuery = "DELETE FROM posts WHERE `id`=? AND `user_id`=?";
        mysqlConnection_1.mysqlDatabase.query(deleteSinglePostQuery, [postId, user_id], (err, result) => {
            if (err) {
                res.json(err);
            }
            if (result.affectedRows > 0)
                return res.status(200).json({
                    success: true,
                    message: "Post has been deleted.",
                });
            return res.status(403).json("You can delete only your post");
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            err: err.message
        });
    }
});
exports.deleteSinglePost = deleteSinglePost;
const getSinglePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Post Params
        const paramsPostId = req.params.id;
        if (!paramsPostId) {
            const statusCode = 404;
            return res.status(statusCode).json({
                success: false,
                message: "Please provide a parameter id"
            });
        }
        const singlePostQuery = "SELECT * FROM posts WHERE id=(?)";
        mysqlConnection_1.mysqlDatabase.query(singlePostQuery, [paramsPostId], (singlePostErr, singlePostResult) => {
            if (singlePostErr)
                res.json(singlePostErr);
            else
                res.json(singlePostResult);
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            err: err.message
        });
    }
});
exports.getSinglePost = getSinglePost;
