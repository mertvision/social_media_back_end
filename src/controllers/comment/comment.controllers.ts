/**
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Libraries (NPM)
import moment from "moment";
// Express Types (Request and Response)
import {Request, Response} from "express";
// MySQL Database
import {mysqlDatabase} from "../../connection/mysql/mysqlConnection";

export const getPostComments = async (req: Request, res: Response) => {
    try{
        const getPostCommentsQuery = "SELECT c.*, u.id AS userId, u.name FROM comments AS c JOIN users AS u ON (u.id=c.user_id) WHERE c.post_id = ? ORDER BY c.created_at DESC";
        //         const getPostCommentsQuery = "SELECT c.*, u.id AS userId, name FROM comments AS c JOIN users AS u ON (u.id = c.user_id) WHERE c.post_id = ?";
        mysqlDatabase.query(getPostCommentsQuery, [req.query.postId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
          });

    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err
         });
    }
}

export const createNewComment = async (req: Request, res: Response) => {
    try{
      const description = req.body.description;
      const user_id: any = req.user?.id;
      const post_id: any = req.query.postId;

      const values = [description, moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), user_id, post_id]

      const createNewCommentQuery = "INSERT INTO comments(`description`, `created_at`, `user_id`, `post_id`) VALUES (?)"
      mysqlDatabase.query(createNewCommentQuery, [values], (err, result) => {
        if(err){
            return res.status(500).json({
                success: false,
                message: "Unexpected error"
            })
        }
        else if(result){
            return res.status(200).json({
                success: true,
                message: "New comment has been created."
            })
        }
      })
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err
         });
    }
}

export const deleteComment = async (req: Request, res: Response) => {
    try{
        const comment_id = req.query.commentId;
        const user_id = req.user?.id;

        const deleteCommentQuery: string = "DELETE FROM comments WHERE `id` = ? AND `user_id` = ?";
        mysqlDatabase.query(deleteCommentQuery, [comment_id, user_id], (err, result)=> {
            if (err){
                return res.status(500).json({
                    success: false,
                    message: "Unexpected error"
                })
            }
            else if(result){
                if(result.affectedRows > 0){
                    return res.status(200).json({
                        success: true,
                        message: "Comment has been deleted."
                    })
                }
                else if(result.affectedRows === 0){
                    return res.status(409).json({
                        success: false,
                        message: "You can delete only your comment."
                    })
                }
            }
        })

    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err
         });
    }
}