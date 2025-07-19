import {Icon} from '../../../../../../components';
import styled from "styled-components";
import {openModal, CLOSE_MODAL, removeCommentAsync} from '../../../../../../actions';
import {useDispatch} from "react-redux";
import {useServerRequest} from '../../../../../../hooks/use-server-request';

const CommentContainer = ({className, postId, id, author, publishedAt, content}) => {
    const dispatch = useDispatch();
    const requestServer = useServerRequest();

    const onCommentRemove = (id) => {
        dispatch(
            openModal({
            text: 'Delete comment',
            onConfirm: () => {
                dispatch(removeCommentAsync(requestServer, postId, id));
                dispatch(CLOSE_MODAL);
            },
            onCancel: () => dispatch(CLOSE_MODAL),
            }),
        );
    }; 

    return(
        <div className ={className}>
            <div className = "comment">
                <div className = "information-panel">
                    <div className = "author">
                        <Icon
                            inactive={true}
                            id="fa-user"
                            size="18px"
                            margin="0 7px 0 0"
                            onClick={() => {}}
                        />
                        {author}
                    </div>
                    <div className = "published-at">
                    <Icon
                        inactive={true}
                        id="fa-calendar-days"
                        size="18px"
                        margin="0 7px 0 0"
                        onClick={() => {}}
                    />
                    {publishedAt}
                </div>
            </div>
            <div className = "comment-text">{content}</div>
        </div>
             <Icon
                id="fa-trash-can"
                margin="0 0 0 10px"
                onClick={() => onCommentRemove()}
            />
        </div>
    );
};
            
export const Comment = styled(CommentContainer)`
    display: flex;
    width: 100%;
    margin-top: 10 px;

    & .comment {
        width: 550px;
        padding: 5px 10px;
        border: 1px solid #ccc;
    }

    & .information-panel {
        display: flex;
        justify-content: space-between;
        
    }

    & .author,
    & .published-at {
        display: flex;
    }

    & .comment-text {
        font-size: 16px;
        line-height: 1.5;
        color: #333;
    }
`;