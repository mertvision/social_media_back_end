/**
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

import express, {Router} from "express";
const router: Router = express.Router();

import { getAccount, updateAccount, deleteAccount } from "../../controllers/account/account.controllers";
import { checkAccessToken } from "../../middlewares/auth/checkAccessToken";


router.get('/',checkAccessToken , getAccount);
router.put('/', checkAccessToken, updateAccount);
router.delete('/', checkAccessToken, deleteAccount);

export default router;