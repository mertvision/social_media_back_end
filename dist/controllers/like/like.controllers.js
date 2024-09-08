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
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeLike = exports.addLike = exports.getPostLikes = void 0;
// MySQL Database
const mysqlConnection_1 = require("../../connection/mysql/mysqlConnection");
const getPostLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post_id = req.query.postId;
        const getPostLikesQuery = "SELECT l.*, u.id AS userId, u.name AS name FROM likes AS l JOIN users AS u ON (l.like_user_id = u.id) WHERE l.like_post_id = ?";
        mysqlConnection_1.mysqlDatabase.query(getPostLikesQuery, [post_id], (err, result) => {
            if (err) {
                res.json(err);
            }
            if (result)
                res.json(result);
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err
        });
    }
    ;
});
exports.getPostLikes = getPostLikes;
const addLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const post_id = req.query.postId;
        const addLikeToPostQuery = "INSERT INTO likes(`like_user_id`,`like_post_id`) VALUES (?,?)";
        mysqlConnection_1.mysqlDatabase.query(addLikeToPostQuery, [user_id, post_id], (err, data) => {
            if (err)
                return res.status(500).json(err);
            if (data)
                return res.status(200).json("Post has been liked.");
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err
        });
    }
    ;
});
exports.addLike = addLike;
const removeLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const like_user_id = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        const like_post_id = req.query.postId;
        const removeLikeQuery = "DELETE FROM likes WHERE `like_user_id` = ? AND `like_post_id` = ?";
        mysqlConnection_1.mysqlDatabase.query(removeLikeQuery, [like_user_id, like_post_id], (err, result) => {
            if (err)
                res.json(err);
            if (result) {
                res.json({
                    success: true,
                    message: "Like has been removed"
                });
            }
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err
        });
    }
    ;
});
exports.removeLike = removeLike;
