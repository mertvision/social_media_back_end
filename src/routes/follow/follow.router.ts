// Importing the Express and Router modules and creating a router object.
import express, {Router} from "express";
const router: Router = express.Router();

import {getFollowers, follow, unfollow} from "../../controllers/follow/follow.controllers";
import { checkAccessToken } from "../../middlewares/auth/checkAccessToken";

router.get('/', checkAccessToken, getFollowers);
router.post('/', checkAccessToken, follow);
router.delete('/',checkAccessToken, unfollow);

export default router;