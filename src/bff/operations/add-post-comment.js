
import { addComment, getPost } from "../api";
import { sessions } from "../sessions";
import { ROLE } from "../constants";
import { getPostCommentsWithAuthor } from "../utils/get-post-comments-with-author";

export const addPostComment = async (hash, userId, postId, content) => {
    const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER];

    const access = await sessions.access(hash, accessRoles);
    if (!access) {
        return {
            error: 'Access denied',
            res: null,
        };
    }

    await addComment(userId, postId, content);

    const post = await getPost(postId);


    const commentsWithAuthor = await getPostCommentsWithAuthor(postId);

    return {
        error: null,
        res: {
            ...post,
            comments: commentsWithAuthor,
        },    
    };

};