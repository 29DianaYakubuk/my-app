import { useMatch, useParams } from 'react-router-dom';
import { PostForm, PostContent, Comments } from './components';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector,useDispatch } from 'react-redux';
import { useServerRequest } from '../../hooks/use-server-request';
import { loadPostAsync } from '../../actions';
import { selectPost } from '../../selectors/select-post';


const PostContainer = ({ className }) => {
    const post = useSelector(selectPost);
    const dispatch = useDispatch();
    const isEditing =useMatch('/post/:id/edit');
    const params = useParams();
    const requestServer = useServerRequest();

    useEffect(() => {
        dispatch(loadPostAsync(requestServer, params.id));
    }, [dispatch, requestServer, params.id]);

    return (
        <div className={className}>
            {isEditing ? (
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

