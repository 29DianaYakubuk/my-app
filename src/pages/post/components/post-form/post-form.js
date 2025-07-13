import styled from 'styled-components';
import {Icon} from '../../../../components/icon/icon';
import {Input} from '../../../../components/input/input';
import { SpecialPanel } from '../special-panel/special-panel';
import { useRef } from 'react';
import { sanitizeContent } from './utils/sanitize-content';
import {useDispatch} from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { savePostAsync } from '../../../../actions';
import { useServerRequest } from '../../../../hooks/use-server-request';

const PostFormContainer = ({
    className,
    post: { id, title, imageUrl, content, publishedAt },
}) => {
    const imageRef = useRef(null);
    const titleRef = useRef(null);
    const contentRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const requestServer = useServerRequest; // Assuming you have a server request handler
    
    const onSave = () => {
        const newImageUrl = imageRef.current.value;
        const newTitle = titleRef.current.value;
        const newContent = sanitizeContent(contentRef.current.innerHTML);

        dispatch(
            savePostAsync(requestServer,{
                id,
                imageUrl: newImageUrl,
                title: newTitle,
                content: newContent,
            }),    
    // Assuming you want to keep the same published date
        ).then(() => navigate(`/post/${id}`));
    };

    return (
        <div className={className}>
            <Input ref={imageRef} defaultValue={imageUrl} placeholder="Image..."/>
            <Input ref={titleRef} defaultValue={title} placeholder="Title..."/>
            <SpecialPanel publishedAt={publishedAt} margin="20px 0" editButton={
                <Icon 
                    id="fa-floppy-disk"
                    size="21px"
                    margin="0 7px 0 0"
                    onClick={() => {

                    }}
                />
            } 
        />
        <div 
            ref={contentRef}
            contentEditable={true} 
            suppressContentEditableWarning={true} 
            className="post-tex"
        >
                {content}
            </div>
        </div>
    );
};

export const PostForm = styled(PostFormContainer)`
    
& img {
        float: left;
        margin: 0 20px 10px 0;
    }

    & .post-tex {
       font-size: 18px;
       white-space: pre-line
    }
`;
