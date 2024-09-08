/**
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */


// Libraries 
import { Request, Response } from "express"; // Express Request and Response objects
import bcrypt from "bcryptjs"; // Library for password hashing
import jwt from "jsonwebtoken"; // Library for generating and verifying JSON Web Tokens
// MySQL Database Connection
import { mysqlDatabase } from "../../connection/mysql/mysqlConnection"; // MySQL database connection object

/** This function handles user registration.
 * @param req - Express Request Object
 * @param res - Express Response Object
 * @returns JSON Object
 */
export const register = async (req: Request, res: Response) => {
    try {
        // Retrieving values from user inputs in the request body:
        const name: string = req.body.name;
        const username: string = req.body.username;
        const email: string = req.body.email;
        const password: string = req.body.password;

        // SQL query to check if an email already exists in the "users" table:
        const checkEmailOrUsernameExistsQuery: string = "SELECT id, email FROM users WHERE `email` = ? OR `username`=?";

        mysqlDatabase.query(checkEmailOrUsernameExistsQuery, [email, username], (err, result) => {
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
                })
            }
            else if (result.length === 0) {
                const salt = bcrypt.genSaltSync(10);
                const hashedPassword = bcrypt.hashSync(password, salt);

                // values as an array
                const values: string[] = [name, username, email, hashedPassword];

                const loginQuery: string = "INSERT INTO users (`name`,`username`,`email`,`password`) VALUES (?)";

                mysqlDatabase.query(loginQuery, [values], (queryError, queryResult: any) => {
                    if (queryError) return res.status(500).json({
                        success: false,
                        message: queryError.message
                    });
                    else if (queryResult) {
                        return res.status(200).json({
                            success: true,
                            message: "User has been created."
                        });
                    };
                });
            };
        });
    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    };
};

/** This function handles user login.
 * @param req - Express Request Object
 * @param res - Express Response Object
 * @returns JSON Object
 */
export const login = async (req: Request, res: Response) => {
    try {
        // Retrieving the user's email and password from the request body:
        const email: string = req.body.email;

        // Checking if the email is provided
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Please provide an e-mail."
            })
        };

        // SQL query to retrieve user data based on the email:
        const loginQuery: string = "SELECT * FROM users WHERE `email`=?";

        // Query for login and authentication
        mysqlDatabase.query(loginQuery, [email], (err: any, result: any) => {
            // If there is an error during the query execution
            if (err) return res.status(500).json({
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
                const checkPassword = bcrypt.compareSync(req.body.password, result[0].password);

                // If the password is incorrect
                if (!checkPassword) {
                    return res.status(400).json({
                        success: false,
                        message: "The password is incorrect. Please try again."
                    });
                };

                // Generating a JSON Web Token (JWT) using the user's ID and JWT secret key:
                const JWT_SECRET_KEY: any = process.env.JWT_SECRET_KEY; // Secret key for JWT
                const token = jwt.sign({ id: result[0].id }, JWT_SECRET_KEY); // Generating the JWT

                // Removing the password field from the user object
                const { password, ...others } = result[0];

                // Setting the JWT as a cookie and returning the user data in the response
                return res.status(200).cookie("accessToken", token, { httpOnly: true }).json({
                    success: true,
                    user: others
                });
            };
        });
    }
    catch (err: any) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    };
};

/** This function handles user logout.
 * @param {req} - Express Request Object
 * @param {res} - Express Response Object
 * @returns JSON Object
 */
export const logout = async (req: Request, res: Response) => {
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
    catch (err: any) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    };
};