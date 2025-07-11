import generateDate from "../utils/generate-date";

export const addComment = async (userId, postId, content) => 
    fetch(`http://localhost:3005/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            author_id: userId,
            post_id: postId,
            content: content,
            published_at: generateDate(),
         }),
    });