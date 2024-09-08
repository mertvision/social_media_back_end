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
exports.deleteAccount = exports.updateAccount = exports.getAccount = void 0;
const mysqlConnection_1 = require("../../connection/mysql/mysqlConnection");
const getAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.query.userId;
        const getAccountQuery = "SELECT id, name, username FROM users WHERE `id` = ?";
        mysqlConnection_1.mysqlDatabase.query(getAccountQuery, [user_id], (err, result) => {
            if (err) {
                res.json(err.message);
            }
            else if (result) {
                return res.status(200).json({
                    success: true,
                    user: result[0]
                });
            }
        });
    }
    catch (err) {
        res.json(err.message);
    }
});
exports.getAccount = getAccount;
const updateAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const name = req.body.name;
        const username = req.body.username;
        const email = req.body.email;
        const values = [name, username, email, user_id];
        const updateAccountQuery = "UPDATE users SET `name`=?,`username`=?,`email`=? WHERE id=? ";
        mysqlConnection_1.mysqlDatabase.query(updateAccountQuery, values, (err, result) => {
            if (err) {
                res.json(err.message);
            }
            else if (result.affectedRows > 0) {
                res.json("Has been updated");
            }
            else if (result.affectedRows === 0)
                res.json("You can update only your account.");
        });
    }
    catch (err) {
        res.json(err);
    }
});
exports.updateAccount = updateAccount;
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json("hi");
    }
    catch (err) {
        res.json(err);
    }
});
exports.deleteAccount = deleteAccount;
