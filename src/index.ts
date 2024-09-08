/**
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Libraries (NPM);
import express, {Express, Request, Response, NextFunction} from "express"; // Express framework for building web applications
import cors from "cors"; // Cross-Origin Resource Sharing middleware 
import dotenv from "dotenv"; // Library for handling environment variables
import helmet from "helmet"; // Middleware for enhancing API security
import morgan from "morgan"; // HTTP request logger middleware
import cookieParser from "cookie-parser"; // Middleware for parsing cookies

// API Routes
import routes from "./routes/index";

// Start Server Config (Enviroment Variables)
dotenv.config();

// Server Port
const PORT: number = Number(process.env.PORT);
// Server with Express
const server: Express = express();

// Server Middlewares
// Middleware to enable cross-origin requests with credentials.
server.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
server.use(cors()); // Cross Origin Resource Sharing
server.use(express.json()); // Middleware to parse JSON bodies in Express
server.use(helmet()); // Middleware for API security features
server.use(morgan("common")); // Middleware for logging API requests
server.use(cookieParser()); // Middleware for parsing cookies
server.use('/api', routes); // Middleware to handle API routes

// Global declaration to extend the Express Request interface and add an optional 'user' property with an 'id' field of type number
declare global {
    namespace Express {
      interface Request {
        user?: {
          id: number;        
        };
      }
    }
};

/* Asynchronous function to start the server by listening on the specified port. 
It prints the server URL if the server starts successfully and logs an error message if there is an error starting the server. */
const startServer = async (): Promise<void> => {
    // Listen Server Port and Start Server
    server.listen(PORT, async () => {
        try {
            console.log(`Server is running on http://localhost:${PORT}`);
        } catch (err: any) {
            console.log("Server has stopped working. Error:" + err.message);
        };
    });
};

// Run startServer()
startServer();

