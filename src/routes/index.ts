/**
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Importing the Express and Router modules and creating a router object.
import express, {Router} from "express";
const router: Router = express.Router();

// Routing paths for different endpoints like authentication, accounts, posts, comments, likes and followers are defined.
import authRouter from "./auth/auth.router";
import accountRouter from "./account/account.router";
import postRouter from "./post/post.router";
import commentRouter from "./comment/comment.router";
import likeRouter from "./like/like.router";
import followRouter from "./follow/follow.router"

// Each router is mounted on a specific path using the 'use' method of the main router.
router.use('/auth', authRouter);
router.use('/account', accountRouter);
router.use('/post', postRouter);
router.use('/comment', commentRouter);
router.use('/like', likeRouter);
router.use('/follow', followRouter);

// The main router is exported as the default module.
export default router;