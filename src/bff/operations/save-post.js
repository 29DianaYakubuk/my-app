
import { sessions } from '../sessions';
import { ROLE } from '../constants';
import { updatePost, addPost } from '../api';
 
export const savePost = async (hash, newPostData) => {
    const accessRoles = [ROLE.ADMIN];

    const access = await sessions.access(hash, accessRoles);

    if (!access) {
        return {
            error: 'Access denied',
            res: null,
        };
    }

    const savedPost = 
    newPostData.id === '' 
    ? await addPost(newPostData)
    : await updatePost(newPostData);

    return {
        error:null,
        res: savedPost,
    };
};