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
exports.deleteComment = exports.createNewComment = exports.getPostComments = void 0;
// Libraries (NPM)
const moment_1 = __importDefault(require("moment"));
// MySQL Database
const mysqlConnection_1 = require("../../connection/mysql/mysqlConnection");
const getPostComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getPostCommentsQuery = "SELECT c.*, u.id AS userId, u.name FROM comments AS c JOIN users AS u ON (u.id=c.user_id) WHERE c.post_id = ? ORDER BY c.created_at DESC";
        //         const getPostCommentsQuery = "SELECT c.*, u.id AS userId, name FROM comments AS c JOIN users AS u ON (u.id = c.user_id) WHERE c.post_id = ?";
        mysqlConnection_1.mysqlDatabase.query(getPostCommentsQuery, [req.query.postId], (err, data) => {
            if (err)
                return res.status(500).json(err);
            return res.status(200).json(data);
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err
        });
    }
});
exports.getPostComments = getPostComments;
const createNewComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const description = req.body.description;
        const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const post_id = req.query.postId;
        const values = [description, (0, moment_1.default)(Date.now()).format("YYYY-MM-DD HH:mm:ss"), user_id, post_id];
        const createNewCommentQuery = "INSERT INTO comments(`description`, `created_at`, `user_id`, `post_id`) VALUES (?)";
        mysqlConnection_1.mysqlDatabase.query(createNewCommentQuery, [values], (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Unexpected error"
                });
            }
            else if (result) {
                return res.status(200).json({
                    success: true,
                    message: "New comment has been created."
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
});
exports.createNewComment = createNewComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const comment_id = req.query.commentId;
        const user_id = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        const deleteCommentQuery = "DELETE FROM comments WHERE `id` = ? AND `user_id` = ?";
        mysqlConnection_1.mysqlDatabase.query(deleteCommentQuery, [comment_id, user_id], (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Unexpected error"
                });
            }
            else if (result) {
                if (result.affectedRows > 0) {
                    return res.status(200).json({
                        success: true,
                        message: "Comment has been deleted."
                    });
                }
                else if (result.affectedRows === 0) {
                    return res.status(409).json({
                        success: false,
                        message: "You can delete only your comment."
                    });
                }
            }
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err
        });
    }
});
exports.deleteComment = deleteComment;
