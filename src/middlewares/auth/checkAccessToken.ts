/**
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

import { Request,Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const checkAccessToken = async (req: Request, res: Response, next: NextFunction) => {
      const JWT_SECRET_KEY: any = process.env.JWT_SECRET_KEY;
      const accessToken: string = req.cookies.accessToken;

      jwt.verify(accessToken, JWT_SECRET_KEY, (err: any, user: any)=> {
        if(err){
            return res.status(403).json({
                success: false,
                message: "You are not authorized"
            })
        }
        else if(user){
            req.user = {
                id: user.id,
            };
        }
        next();
      });
};