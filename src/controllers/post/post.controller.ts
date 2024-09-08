/**
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

import {mysqlDatabase} from "../../connection/mysql/mysqlConnection";
import moment from "moment";
import {Request, Response} from "express";

export const getPosts = async (req: Request, res: Response) => {
    try{
        res.json("posts")
    }
    catch(err: any){
        return res.status(500).json({
            success: false,
            err: err.message
        })}
};

// Create New Post Controller
export const createNewPost = async (req: Request, res: Response) => {
    try{
        // Post Description and Post Image
        const description = req.body.description;
        const image = req.body.image;
        const user_id = req.user?.id;

        const addNewPostQuery = "INSERT INTO posts(`description`, `image`, `user_id`, `created_at`) VALUES (?)";
        const addNewPostQueryValues = [description, image, user_id, moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")];

        mysqlDatabase.query(addNewPostQuery, [addNewPostQueryValues], (postError: any, postResult: any)=> {
            if(postError){console.log(postError)}
            else if(postResult){
                return res.status(201).json({
                    success: true,
                    message: "Post has been created."
                });
            };
        });
    }
    catch(err: any){
        return res.status(500).json({
            success: false,
            err: err.message
        });
    }
};
export const updateSinglePost = async (req: Request, res: Response) => {
    try{
       res.json("update")
    }
    catch(err: any){
        return res.status(500).json({
            success: false,
            err: err.message
        })
    }
};
export const deleteSinglePost = async (req: Request, res: Response) => {
    try{
        const postId = req.params.id;
        const user_id = req.user?.id;

        const deleteSinglePostQuery: string = "DELETE FROM posts WHERE `id`=? AND `user_id`=?";
        mysqlDatabase.query(deleteSinglePostQuery, [postId, user_id], (err: any, result: any)=> {
            if(err) {
                res.json(err);
            }
            if(result.affectedRows>0) return res.status(200).json({
                success: true,
                message: "Post has been deleted.",
            });
            return res.status(403).json("You can delete only your post")
        })
    }
    catch(err: any){
        return res.status(500).json({
            success: false,
            err: err.message
        });
    }
};
export const getSinglePost = async (req: Request, res: Response) => {
    try{
        // Post Params
        const paramsPostId = req.params.id;

        if(!paramsPostId){
            const statusCode: number = 404;
            return res.status(statusCode).json({
                success: false,
                message: "Please provide a parameter id"
            });
        }

        const singlePostQuery = "SELECT * FROM posts WHERE id=(?)";
        mysqlDatabase.query(singlePostQuery, [paramsPostId], (singlePostErr, singlePostResult)=> {
            if(singlePostErr) res.json(singlePostErr);
            else res.json(singlePostResult)
        })
    }
    catch(err: any){
        return res.status(500).json({
            success: false,
            err: err.message
        });
    }
};

