import { useMatch, useParams } from 'react-router-dom';
import { PostForm, PostContent, Comments } from './components';
import { useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { useSelector,useDispatch } from 'react-redux';
import { useServerRequest } from '../../hooks/use-server-request';
import { loadPostAsync, RESET_POST_DATA } from '../../actions';
import {initialPostState} from '../../reducers'
import { selectPost } from '../../selectors/select-post';


const PostContainer = ({ className }) => {
   
    const dispatch = useDispatch();
    const isCreating = useMatch('/post');
    const isEditing =useMatch('/post/:id/edit');
    const params = useParams();
    const requestServer = useServerRequest();
    const post = useSelector(selectPost);

    useLayoutEffect(() => {
        dispatch(RESET_POST_DATA);
     }, [dispatch, isCreating]);

    useEffect(() => {
        if (isCreating) {
            return;
        }

        dispatch(loadPostAsync(requestServer, params.id));
    }, [dispatch, requestServer, params.id, isCreating]);

    return (
        <div className={className}>
            {isCreating || isEditing ? (
                <PostForm post={post}/>
            ) : (
                <>
                    <PostContent post={post} />
                    <Comments comments={post.comments} postId={post.id} />
                </>
            )}
        </div>        
    );
};

export const Post = styled(PostContainer)`
    margin:40px 0;
    padding: 0 80px;
`;

