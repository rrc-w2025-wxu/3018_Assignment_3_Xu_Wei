import { Post } from "../models/postModel";
import * as firestoreRepository from "../repositories/firestoreRepository";
import { postModelSchema } from "../validations/postValidation";
import { validate } from "../middleware/validate";

/**
 * Updates an existing post.
 * @param {Post} postData - The updated post data.
 * @returns {Promise<void>}
 * @throws {Error} - If validation or repository operation fails.
 */
export const updatePost = async (postData: Post): Promise<void> => {
    try {
        validate(postModelSchema, postData);
        await firestoreRepository.updateDocument(
            POSTS_COLLECTION,
            postData.id,
            postData
        );
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to update post ${postData.id}: ${errorMessage}`
        );
    }
};

// ... other service functions (getPostById, updatePost, deletePost) ...