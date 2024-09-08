// Importing the Express and Router modules and creating a router object.
import express, {Router} from "express";
const router: Router = express.Router();

// Importing specific controller functions for register, login, and logout operations.
import {register, login, logout} from "../../controllers/auth/auth.controller";

/* Defining routes for register, login, and logout endpoints using the 'post' and 'get' methods of the router.
Each route is associated with a corresponding controller functions. */
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

// The router is exported as the default module.
export default router;