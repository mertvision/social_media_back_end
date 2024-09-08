// Importing the Express and Router modules and creating a router object.
import express, {Router} from "express";
const router: Router = express.Router();

import {getPosts, getSinglePost, createNewPost, updateSinglePost, deleteSinglePost} from "../../controllers/post/post.controller";
import { checkAccessToken } from "../../middlewares/auth/checkAccessToken";

router.get('/', checkAccessToken, getPosts);
router.post('/', checkAccessToken ,createNewPost);
router.put('/:id', checkAccessToken, updateSinglePost);
router.delete('/:id', checkAccessToken, deleteSinglePost);
router.get('/:id', checkAccessToken, getSinglePost);

export default router;