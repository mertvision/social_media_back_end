/**
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Libraries
import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

/* This code is used to create a connection to a MySQL database.
The host address, username, password, and database name required for the MySQL connection are retrieved from environment variables. */
export const mysqlDatabase = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB
});



