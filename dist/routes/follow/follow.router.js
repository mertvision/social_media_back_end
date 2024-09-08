"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing the Express and Router modules and creating a router object.
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const follow_controllers_1 = require("../../controllers/follow/follow.controllers");
const checkAccessToken_1 = require("../../middlewares/auth/checkAccessToken");
router.get('/', checkAccessToken_1.checkAccessToken, follow_controllers_1.getFollowers);
router.post('/', checkAccessToken_1.checkAccessToken, follow_controllers_1.follow);
router.delete('/', checkAccessToken_1.checkAccessToken, follow_controllers_1.unfollow);
exports.default = router;
