/**
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Libraries (NPM)
// Express Types (Request and Response)
import {Request, Response} from "express";
// MySQL Database
import {mysqlDatabase} from "../../connection/mysql/mysqlConnection";

export const getPostLikes = async (req: Request, res: Response) => {
    try{
       const post_id = req.query.postId;

       const getPostLikesQuery: string = "SELECT l.*, u.id AS userId, u.name AS name FROM likes AS l JOIN users AS u ON (l.like_user_id = u.id) WHERE l.like_post_id = ?";
       mysqlDatabase.query(getPostLikesQuery, [post_id], (err: any, result: any)=> {
        if(err){res.json(err)}
        if(result) res.json(result)
       });
    }
    catch(err){
       return res.status(500).json({
        success: false,
        message: err
       });
    };
};

export const addLike = async (req: Request, res: Response) => {
    try{
        const user_id = req.user?.id;
        const post_id = req.query.postId;

        const addLikeToPostQuery: string = "INSERT INTO likes(`like_user_id`,`like_post_id`) VALUES (?,?)";

        mysqlDatabase.query(addLikeToPostQuery, [user_id, post_id], (err: any, data: any) => {
          if (err) return res.status(500).json(err);
          if(data) return res.status(200).json("Post has been liked.");
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err
        });
    };
};

export const removeLike = async (req: Request, res: Response) => {
    try{
        const like_user_id = req.user?.id;
        const like_post_id = req.query.postId;

        const removeLikeQuery: string = "DELETE FROM likes WHERE `like_user_id` = ? AND `like_post_id` = ?";
        mysqlDatabase.query(removeLikeQuery,[like_user_id, like_post_id], (err, result)=> {
            if(err) res.json(err);
            if(result){
                res.json({
                    success: true,
                    message: "Like has been removed"
                })
            }
        })
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err
        })
    };
};