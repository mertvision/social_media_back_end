// Importing the Express and Router modules and creating a router object.
import express, {Router} from "express";
const router: Router = express.Router();

import {getPostLikes, addLike, removeLike} from "../../controllers/like/like.controllers";
import { checkAccessToken } from "../../middlewares/auth/checkAccessToken";

router.get('/', checkAccessToken, getPostLikes);
router.post('/', checkAccessToken ,addLike);
router.delete('/', checkAccessToken, removeLike);

export default router;