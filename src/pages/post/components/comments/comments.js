import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {Icon} from '../../../../components';
import {Comment} from './components';
import { selectUserId, selectUserRole } from "../../../../selectors";
import { useServerRequest } from "../../../../hooks/use-server-request";
import { addCommentAsync } from "../../../../actions";
import { ROLE } from '../../../../constants';
import PropTypes from 'prop-types';
import { PROP_TYPE } from '../../../../constants/prop-type';

const CommentsContainer = ({className, comments, postId}) => {
    const [newComment, setNewComment] = useState('');
    const dispatch = useDispatch();
    const userId = useSelector(selectUserId);
    const requestServer = useServerRequest();
    const userRole = useSelector(selectUserRole); // Assuming you have a user role in your state

    const onNewCommentAdd = (userId, postId, content) => {
        dispatch(addCommentAsync(requestServer, userId, postId, content));
        setNewComment('');
    };

    const isGuest = userRole === ROLE.GUEST;

    return (
        <div className={className}>
            {isGuest && (
                <div className = "new-comment">
                <textarea
                    name = "comment"
                    value={newComment}
                    placeholder="Comments..."
                    onChange={({ target }) => setNewComment(target.value)}
                ></textarea>
                <Icon
                    id="fa-paper-plane"
                    margin="0 7px 0 0"
                    onClick={() => onNewCommentAdd(userId, postId, newComment)}
                />
            </div>
        )}
            <div className = "comments">
                {comments.map(({id, author, content, publishedAt}) => (
                    <Comment
                        key={id}
                        id={id}
                        postId={postId}
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
Comments.propTypes = {
    comments: PropTypes.arrayOf(PROP_TYPE.COMMENT).isRequired,
    postId: PropTypes.string.isRequired,
};