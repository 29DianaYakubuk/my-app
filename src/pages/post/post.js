import { useMatch, useParams } from 'react-router-dom';
import { PostForm, PostContent, Comments } from './components';
import { useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector,useDispatch } from 'react-redux';
import { useServerRequest } from '../../hooks/use-server-request';
import { loadPostAsync, RESET_POST_DATA } from '../../actions';
import { selectPost } from '../../selectors/select-post';
import { Error } from '../../components';
import { PrivateContent } from '../../components';
import { ROLE } from '../../bff/constants/role';


const PostContainer = ({ className }) => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const isCreating = !!useMatch('/post');
    const isEditing = !!useMatch('/post/:id/edit');
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const requestServer = useServerRequest();
    const post = useSelector(selectPost);
    

    useLayoutEffect(() => {
        dispatch(RESET_POST_DATA);
     }, [dispatch, isCreating]);

    useEffect(() => {
        if (isCreating) {
            setIsLoading(false);
            return;
        }

        dispatch(loadPostAsync(requestServer, params.id)).then((postData) => {
                setError(postData.error);
                setIsLoading(false); 
        });
    }, [dispatch, requestServer, params.id, isCreating]);

    if (isLoading) {
        return null;
    }

    const SpecificPostPage =
        isCreating || isEditing ? (
            <PrivateContent access={[ROLE.ADMIN]} serverError={error}>
                <div className={className}>
                    <PostForm post={post} />
                </div>
            </PrivateContent>
        ) : (
            <div className={className}>
                <PostContent post={post} />
                <Comments comments={post.comments} postId={post.id} />
            </div>
        ); 

    return error ? (
        <Error error={error} />
    ) : SpecificPostPage; 
};

export const Post = styled(PostContainer)`
    margin:40px 0;
    padding: 0 80px;
`;
