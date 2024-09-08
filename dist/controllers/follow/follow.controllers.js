"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unfollow = exports.follow = exports.getFollowers = void 0;
const mysqlConnection_1 = require("../../connection/mysql/mysqlConnection");
const getFollowers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const getFollowersQuery = "SELECT u.name, u.id AS followerUserId FROM follows AS f JOIN users AS u ON (f.follower_user_id = u.id) WHERE `followed_user_id` = ?";
        mysqlConnection_1.mysqlDatabase.query(getFollowersQuery, [user_id], (err, result) => {
            if (err)
                res.json(err);
            else
                res.json(result);
        });
    }
    catch (err) {
        res.json(err.message);
    }
});
exports.getFollowers = getFollowers;
const follow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const user_id = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        const followUserId = req.query.followUserId;
        const values = [user_id, followUserId];
        const checkAlreadyFollowQuery = "SELECT * FROM follows WHERE `follower_user_id` = ? AND `followed_user_id` = ?";
        mysqlConnection_1.mysqlDatabase.query(checkAlreadyFollowQuery, values, (err, result) => {
            if (err)
                return res.json(err);
            if (result.length === 0) {
                const followUserQuery = "INSERT INTO follows(`follower_user_id`, `followed_user_id`) VALUES (?,?)";
                mysqlConnection_1.mysqlDatabase.query(followUserQuery, values, (followErr, followResult) => {
                    if (followErr)
                        res.json(followErr.message);
                    else if (followResult) {
                        res.json({
                            success: true,
                            message: `Follow process is successful`
                        });
                    }
                });
            }
            if (result.length > 0) {
                return res.json({
                    success: false,
                    message: "You already followed this user."
                });
            }
            ;
        });
    }
    catch (err) {
        res.json(err.message);
    }
});
exports.follow = follow;
const unfollow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const user_id = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
        const unfollowUserId = req.query.unfollowUserId;
        const values = [user_id, unfollowUserId];
        const checkAlreadyUnfollowQuery = "SELECT * FROM follows WHERE `follower_user_id` = ? AND `followed_user_id` = ?";
        mysqlConnection_1.mysqlDatabase.query(checkAlreadyUnfollowQuery, values, (err, result) => {
            if (err)
                return res.json(err);
            if (result.length > 0) {
                const unfollowUserQuery = "DELETE FROM follows WHERE `follower_user_id` = ? AND `followed_user_id` = ?";
                mysqlConnection_1.mysqlDatabase.query(unfollowUserQuery, values, (followErr, followResult) => {
                    if (followErr)
                        res.json(followErr.message);
                    else if (followResult) {
                        res.json({
                            success: true,
                            message: `Unfollow process is successful`
                        });
                    }
                });
            }
            if (result.length === 0) {
                return res.json({
                    success: false,
                    message: "You already followed this user."
                });
            }
            ;
        });
    }
    catch (err) {
        res.json(err.message);
    }
});
exports.unfollow = unfollow;
