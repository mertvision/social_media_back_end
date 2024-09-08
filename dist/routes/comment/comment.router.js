"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const comment_controllers_1 = require("../../controllers/comment/comment.controllers");
const checkAccessToken_1 = require("../../middlewares/auth/checkAccessToken");
router.get('/', checkAccessToken_1.checkAccessToken, comment_controllers_1.getPostComments);
router.post('/', checkAccessToken_1.checkAccessToken, comment_controllers_1.createNewComment);
router.delete('/', checkAccessToken_1.checkAccessToken, comment_controllers_1.deleteComment);
exports.default = router;
