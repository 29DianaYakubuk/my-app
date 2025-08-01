import { deletePost,deleteComment, getComments } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const removePost = async (hash, id) => {
    const accessRoles = [ROLE.ADMIN];

    const access = await sessions.access(hash, accessRoles);
    
    if (!access) {
        return {
            error: 'Access denied',
            res: null,
        };
    }

    await deletePost(id);

    const comments = await getComments(id);

    await Promise.all(comments.map(({ id: commentId }) => deleteComment(commentId)));

 

    return {
        error: null,
        res: true,
    };
};
