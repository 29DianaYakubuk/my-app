import { getComments, getUsers } from '../api';

export const getPostCommentsWithAuthor = async (postId) => {
    const comments = await getComments(postId); // допустим, массив объектов комментариев
    const users = await getUsers();

    return comments.map((comment) => {
        const user = users.find(({ id }) => id === comment.authorId);
        return {
            ...comment,
            author: user?.login ?? 'Unknown',
        };
    });
};
