import express, {Router} from "express";
const router: Router = express.Router();

import {getPostComments, createNewComment, deleteComment} from "../../controllers/comment/comment.controllers";
import { checkAccessToken } from "../../middlewares/auth/checkAccessToken";

router.get('/', checkAccessToken, getPostComments);
router.post('/',checkAccessToken, createNewComment);
router.delete('/',checkAccessToken, deleteComment);

export default router;