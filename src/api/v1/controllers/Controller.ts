import { Request, Response, NextFunction } from "express";
import * as postService from "../services/postService";
import { successResponse } from "../models/responseModel";

/**
 * Handles updating a post.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const updatePostHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await postService.updatePost({ id: req.params.id, ...req.body });
        res.status(200).json(successResponse({}, "Post updated"));
    } catch (error: unknown) {
        next(error);
    }
};

// ... other controller functions (getPostByIdHandler, createPostHandler, deletePostHandler) ...