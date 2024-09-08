/**
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */


import {Request, Response} from "express";
import { mysqlDatabase } from "../../connection/mysql/mysqlConnection";

export const getFollowers = async (req: Request, res: Response) => {
    try{
       const user_id = req.user?.id;

       const getFollowersQuery = "SELECT u.name, u.id AS followerUserId FROM follows AS f JOIN users AS u ON (f.follower_user_id = u.id) WHERE `followed_user_id` = ?";
       mysqlDatabase.query(getFollowersQuery, [user_id], (err, result)=>{
        if(err) res.json(err);
        else res.json(result)
       })
    }
    catch(err: any){
        res.json(err.message)

    }
};

export const follow = async (req: Request, res: Response) => {
    try{
       const user_id = req.user?.id;
       const followUserId = req.query.followUserId;

       const values: any[] = [user_id, followUserId];

       const checkAlreadyFollowQuery = "SELECT * FROM follows WHERE `follower_user_id` = ? AND `followed_user_id` = ?";
       mysqlDatabase.query(checkAlreadyFollowQuery, values, (err, result)=>{
        if(err) return res.json(err)
        if(result.length === 0){
            const followUserQuery: string = "INSERT INTO follows(`follower_user_id`, `followed_user_id`) VALUES (?,?)";
            mysqlDatabase.query(followUserQuery, values, (followErr, followResult)=>{
                if(followErr) res.json(followErr.message);
                else if(followResult){
                    res.json({
                        success: true,
                        message: `Follow process is successful`
                    })
                }
            })

        }
        if(result.length > 0){
            return res.json({
                success: false,
                message: "You already followed this user."
            })
        };
       });

    }
    catch(err: any){
       res.json(err.message);
    }
};

export const unfollow = async (req: Request, res: Response) => {
    try{
        const user_id = req.user?.id;
        const unfollowUserId = req.query.unfollowUserId;

        const values: any[] = [user_id, unfollowUserId];

        const checkAlreadyUnfollowQuery: string = "SELECT * FROM follows WHERE `follower_user_id` = ? AND `followed_user_id` = ?";
        mysqlDatabase.query(checkAlreadyUnfollowQuery, values, (err, result)=>{
         if(err) return res.json(err)
         if(result.length > 0){
             const unfollowUserQuery: string = "DELETE FROM follows WHERE `follower_user_id` = ? AND `followed_user_id` = ?";
             mysqlDatabase.query(unfollowUserQuery, values, (followErr, followResult)=>{
                 if(followErr) res.json(followErr.message);
                 else if(followResult){
                     res.json({
                         success: true,
                         message: `Unfollow process is successful`
                     })
                 }
             })

         }
         if(result.length === 0){
             return res.json({
                 success: false,
                 message: "You are not already following this user."
             })
         };
        });

     }
     catch(err: any){
        res.json(err.message);
     }
};