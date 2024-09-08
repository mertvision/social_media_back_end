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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Libraries (NPM);
const express_1 = __importDefault(require("express")); // Express framework for building web applications
const cors_1 = __importDefault(require("cors")); // Cross-Origin Resource Sharing middleware 
const dotenv_1 = __importDefault(require("dotenv")); // Library for handling environment variables
const helmet_1 = __importDefault(require("helmet")); // Middleware for enhancing API security
const morgan_1 = __importDefault(require("morgan")); // HTTP request logger middleware
const cookie_parser_1 = __importDefault(require("cookie-parser")); // Middleware for parsing cookies
// API Routes
const index_1 = __importDefault(require("./routes/index"));
// Start Server Config (Enviroment Variables)
dotenv_1.default.config();
// Server Port
const PORT = Number(process.env.PORT);
// Server with Express
const server = (0, express_1.default)();
// Server Middlewares
// Middleware to enable cross-origin requests with credentials.
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
server.use((0, cors_1.default)()); // Cross Origin Resource Sharing
server.use(express_1.default.json()); // Middleware to parse JSON bodies in Express
server.use((0, helmet_1.default)()); // Middleware for API security features
server.use((0, morgan_1.default)("common")); // Middleware for logging API requests
server.use((0, cookie_parser_1.default)()); // Middleware for parsing cookies
server.use('/api', index_1.default); // Middleware to handle API routes
;
/* Asynchronous function to start the server by listening on the specified port.
It prints the server URL if the server starts successfully and logs an error message if there is an error starting the server. */
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    // Listen Server Port and Start Server
    server.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(`Server is running on http://localhost:${PORT}`);
        }
        catch (err) {
            console.log("Server has stopped working. Error:" + err.message);
        }
        ;
    }));
});
// Run startServer()
startServer();
