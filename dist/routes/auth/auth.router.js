"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing the Express and Router modules and creating a router object.
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Importing specific controller functions for register, login, and logout operations.
const auth_controller_1 = require("../../controllers/auth/auth.controller");
/* Defining routes for register, login, and logout endpoints using the 'post' and 'get' methods of the router.
Each route is associated with a corresponding controller functions. */
router.post('/register', auth_controller_1.register);
router.post('/login', auth_controller_1.login);
router.get('/logout', auth_controller_1.logout);
// The router is exported as the default module.
exports.default = router;
