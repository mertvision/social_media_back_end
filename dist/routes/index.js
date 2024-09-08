"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing the Express and Router modules and creating a router object.
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Routing paths for different endpoints like authentication, accounts, posts, comments, likes and followers are defined.
const auth_router_1 = __importDefault(require("./auth/auth.router"));
const account_router_1 = __importDefault(require("./account/account.router"));
const post_router_1 = __importDefault(require("./post/post.router"));
const comment_router_1 = __importDefault(require("./comment/comment.router"));
const like_router_1 = __importDefault(require("./like/like.router"));
const follow_router_1 = __importDefault(require("./follow/follow.router"));
// Each router is mounted on a specific path using the 'use' method of the main router.
router.use('/auth', auth_router_1.default);
router.use('/account', account_router_1.default);
router.use('/post', post_router_1.default);
router.use('/comment', comment_router_1.default);
router.use('/like', like_router_1.default);
router.use('/follow', follow_router_1.default);
// The main router is exported as the default module.
exports.default = router;
