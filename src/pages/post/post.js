import {Comments} from '../post/components/comments/comments';
import { useParams } from 'react-router-dom';
import {PostContent} from './components/post-content/post-content';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector,useDispatch } from 'react-redux';
import { useServerRequest } from '../../hooks/use-server-request';
import { loadPostAsync } from '../../actions';
import { selectPost } from '../../selectors/select-post';


const PostContainer = ({ className }) => {
    const post = useSelector(selectPost);
    const dispatch = useDispatch();
    const params = useParams();
    const requestServer = useServerRequest();

    useEffect(() => {
        if (!params.id || typeof params.id !== 'string' || params.id.trim() === '') {
            console.warn('Invalid or empty post ID:', params.id);
            return;
        }

        dispatch(loadPostAsync(requestServer, params.id));
    }, [dispatch, requestServer, params.id]);

    if (!post || !post.id) {
        return <div>Загрузка поста...</div>;
    }

    return (
        <div className={className}>
            <PostContent post={post} />
            <Comments comments={post.comments} postId={post.id} />
        </div>
    );
};

export const Post = styled(PostContainer)`
    display: flex;
    height: auto;
    flex-direction: column;`;

/*const PostContainer = ({className}) => {
    const post = useSelector(selectPost);
    const dispatch = useDispatch();
    const params = useParams();
    const requestServer = useServerRequest();

    useEffect(() => {
    if (
        !params.id ||
        typeof params.id !== 'string' ||
        params.id.trim() === ''
    ) {
        console.warn('Invalid or empty post ID:', params.id);
        return;
    }

    dispatch(loadPostAsync(requestServer, params.id));
}, [dispatch, requestServer, params.id]);


    return (
       <div className={className}>
         <PostContent post={post} />
         <Comments comments={post.comments} />
       </div>
    );
};

export const Post = styled(PostContainer)``;





useEffect(() => {
    dispatch(loadPostAsync(requestServer, params.id));
    // Fetch post data here
}, [dispatch, requestServer, params.id]);*/