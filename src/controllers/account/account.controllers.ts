/**
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */


import {Request, Response} from "express";
import { mysqlDatabase } from "../../connection/mysql/mysqlConnection";

export const getAccount = async (req: Request, res: Response) => {
    try{
      const user_id = req.query.userId;

      const getAccountQuery = "SELECT id, name, username FROM users WHERE `id` = ?";
      mysqlDatabase.query(getAccountQuery, [user_id], (err: any, result: any)=> {
        if(err){
            res.json(err.message);
        }
        else if(result){
          return res.status(200).json({
             success: true,
             user: result[0]
          })
        }
      })


    }
    catch(err: any){
        res.json(err.message)

    }
}

export const updateAccount = async (req: Request, res: Response) => {
    try{
        const user_id = req.user?.id;
        const name: string = req.body.name;
        const username: string = req.body.username;
        const email: string = req.body.email;

        const values = [name, username, email, user_id];

        const updateAccountQuery: string = "UPDATE users SET `name`=?,`username`=?,`email`=? WHERE id=? ";
        mysqlDatabase.query(updateAccountQuery, values, (err: any, result)=>{
            if(err){res.json(err.message)}
            else if(result.affectedRows > 0){
                res.json("Has been updated")
            }
            else if(result.affectedRows === 0) res.json("You can update only your account.")
        })


    }
    catch(err){
       res.json(err)
    }
}

export const deleteAccount = async (req: Request, res: Response) => {
    try{
        res.json("hi")

    }
    catch(err){
        res.json(err)

    }
}