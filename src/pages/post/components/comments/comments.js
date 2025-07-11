import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {Icon} from '../../../../components';
import {Comment} from './components';
import { selectUserId } from "../../../../selectors";
import { useServerRequest } from "../../../../hooks/use-server-request";
import { addCommentAsync } from "../../../../actions";

const CommentsContainer = ({className, comments, postId}) => {
    const [newComment, setNewComment] = useState('');
    const dispatch = useDispatch();
    const userId = useSelector(selectUserId);
    const requestServer = useServerRequest();

    const onNewCommentAdd = (userId, postId, content) => {
        dispatch(addCommentAsync(requestServer, userId, postId, content));
        setNewComment('');
    };

    return (
        <div className={className}>
            <div className = "new-comment">
            <textarea
            name = "comment"
            value={newComment}
            placeholder="Comments..."
            onChange={({ target }) => setNewComment(target.value)}></textarea>
            <Icon
                id="fa-paper-plane"
                margin="0 7px 0 0"
                onClick={() => onNewCommentAdd(userId, postId, newComment)}
                />
            </div>
            <div className = "comments">
                {comments.map(({id, author, content, publishedAt}) => (
                    <Comment
                        key={id}
                        id={id}
                        author={author}
                        content={content}
                        publishedAt={publishedAt}
                    />
                ))}
            </div>
        </div>
    );
};
export const Comments = styled(CommentsContainer)`
    width: 580px;
    margin: 0 auto;

    & .new-comment {
        display: flex;
        width: 100%;
        margin: 20px 0 0;
    }
    & .new-comment  textarea {
        width: 550px;
        height: 120px;
        padding: 10px;
        resize: none;
        font-size: 18px;
    }
`;