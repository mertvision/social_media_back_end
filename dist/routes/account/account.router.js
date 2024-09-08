"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const account_controllers_1 = require("../../controllers/account/account.controllers");
const checkAccessToken_1 = require("../../middlewares/auth/checkAccessToken");
router.get('/', checkAccessToken_1.checkAccessToken, account_controllers_1.getAccount);
router.put('/', checkAccessToken_1.checkAccessToken, account_controllers_1.updateAccount);
router.delete('/', checkAccessToken_1.checkAccessToken, account_controllers_1.deleteAccount);
exports.default = router;
