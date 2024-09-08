"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing the Express and Router modules and creating a router object.
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const post_controller_1 = require("../../controllers/post/post.controller");
const checkAccessToken_1 = require("../../middlewares/auth/checkAccessToken");
router.get('/', checkAccessToken_1.checkAccessToken, post_controller_1.getPosts);
router.post('/', checkAccessToken_1.checkAccessToken, post_controller_1.createNewPost);
router.put('/:id', checkAccessToken_1.checkAccessToken, post_controller_1.updateSinglePost);
router.delete('/:id', checkAccessToken_1.checkAccessToken, post_controller_1.deleteSinglePost);
router.get('/:id', checkAccessToken_1.checkAccessToken, post_controller_1.getSinglePost);
exports.default = router;
