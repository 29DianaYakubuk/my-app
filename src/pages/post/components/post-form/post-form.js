import styled from 'styled-components';
import {Icon} from '../../../../components/icon/icon';
import {Input} from '../../../../components/input/input';
import { SpecialPanel } from '../special-panel/special-panel';
import { useLayoutEffect, useRef, useState } from 'react';
import { sanitizeContent } from './utils/sanitize-content';
import {useDispatch} from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { savePostAsync } from '../../../../actions';
import { useServerRequest } from '../../../../hooks/use-server-request';

const PostFormContainer = ({
    className,
    post: { id, title, imageUrl, content, publishedAt },
}) => {
    const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
    const [titleValue, setTitlelValue] = useState(title);
    const contentRef = useRef(null);
    
    useLayoutEffect(() => {
        setImageUrlValue(imageUrl);
        setTitlelValue(title);  
    }, [imageUrl, title]);
   

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const requestServer = useServerRequest(); // Assuming you have a server request handler
    
    const onSave = () => {
        const newContent = sanitizeContent(contentRef.current.innerHTML);

        dispatch(
            savePostAsync(requestServer,{
                id,
                imageUrl: imageUrlValue,
                title: titleValue,
                content: newContent,
            }),    
    // Assuming you want to keep the same published date
        ).then(({id}) => navigate(`/post/${id}`));
    };
    const onImageChange = ({target}) => setImageUrlValue(target.value);
    const onTitleChange = ({target}) => setTitlelValue(target.value);

    return (
        <div className={className}>
            <Input
                value={imageUrlValue}
                defaultValue={imageUrl}
                placeholder="Image..."
                onChange={onImageChange}
            />
            <Input
                value={titleValue}
                defaultValue={title}
                placeholder="Title..."
                onChange={onTitleChange}
            />

            <SpecialPanel
                id={id}
                publishedAt={publishedAt}
                margin="20px 0"
                editButton={
                    <Icon id="fa-floppy-disk" size="21px" onClick={onSave} />
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
       min-height: 80px;
       border: 1 px solid #000;
       font-size: 18px;
       white-space: pre-line
    }
`;
