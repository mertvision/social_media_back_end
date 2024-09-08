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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs")); // Library for password hashing
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Library for generating and verifying JSON Web Tokens
// MySQL Database Connection
const mysqlConnection_1 = require("../../connection/mysql/mysqlConnection"); // MySQL database connection object
/** This function handles user registration.
 * @param req - Express Request Object
 * @param res - Express Response Object
 * @returns JSON Object
 */
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Retrieving values from user inputs in the request body:
        const name = req.body.name;
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        // SQL query to check if an email already exists in the "users" table:
        const checkEmailOrUsernameExistsQuery = "SELECT id, email FROM users WHERE `email` = ? OR `username`=?";
        mysqlConnection_1.mysqlDatabase.query(checkEmailOrUsernameExistsQuery, [email, username], (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
            else if (result.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: "E-mail or username already used. Please provide another."
                });
            }
            else if (result.length === 0) {
                const salt = bcryptjs_1.default.genSaltSync(10);
                const hashedPassword = bcryptjs_1.default.hashSync(password, salt);
                // values as an array
                const values = [name, username, email, hashedPassword];
                const loginQuery = "INSERT INTO users (`name`,`username`,`email`,`password`) VALUES (?)";
                mysqlConnection_1.mysqlDatabase.query(loginQuery, [values], (queryError, queryResult) => {
                    if (queryError)
                        return res.status(500).json({
                            success: false,
                            message: queryError.message
                        });
                    else if (queryResult) {
                        return res.status(200).json({
                            success: true,
                            message: "User has been created."
                        });
                    }
                    ;
                });
            }
            ;
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
    ;
});
exports.register = register;
/** This function handles user login.
 * @param req - Express Request Object
 * @param res - Express Response Object
 * @returns JSON Object
 */
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Retrieving the user's email and password from the request body:
        const email = req.body.email;
        // Checking if the email is provided
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Please provide an e-mail."
            });
        }
        ;
        // SQL query to retrieve user data based on the email:
        const loginQuery = "SELECT * FROM users WHERE `email`=?";
        // Query for login and authentication
        mysqlConnection_1.mysqlDatabase.query(loginQuery, [email], (err, result) => {
            // If there is an error during the query execution
            if (err)
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            // If no user is found with the email
            else if (result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "User not found."
                });
            }
            // If user is found with the email
            else if (result.length > 0) {
                // Compare the passwords
                const checkPassword = bcryptjs_1.default.compareSync(req.body.password, result[0].password);
                // If the password is incorrect
                if (!checkPassword) {
                    return res.status(400).json({
                        success: false,
                        message: "The password is incorrect. Please try again."
                    });
                }
                ;
                // Generating a JSON Web Token (JWT) using the user's ID and JWT secret key:
                const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY; // Secret key for JWT
                const token = jsonwebtoken_1.default.sign({ id: result[0].id }, JWT_SECRET_KEY); // Generating the JWT
                // Removing the password field from the user object
                const _a = result[0], { password } = _a, others = __rest(_a, ["password"]);
                // Setting the JWT as a cookie and returning the user data in the response
                return res.status(200).cookie("accessToken", token, { httpOnly: true }).json({
                    success: true,
                    user: others
                });
            }
            ;
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
    ;
});
exports.login = login;
/** This function handles user logout.
 * @param {req} - Express Request Object
 * @param {res} - Express Response Object
 * @returns JSON Object
 */
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Clearing the access token cookie to log out the user:
        return res.clearCookie("accessToken", {
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            message: "User has been logged out."
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
    ;
});
exports.logout = logout;
