import styled from 'styled-components';
import { H2 } from '../../../../components/h2/h2';
import { Icon } from '../../../../components/icon/icon';
import { SpecialPanel } from '../special-panel/special-panel';
import { useNavigate } from 'react-router-dom';

const PostContentContainer = ({
    className,
    post: { id, title, imageUrl, content, publishedAt} }) => {
    const navigate = useNavigate();
    return (
        <div className={className}>
            <img src={imageUrl} alt={title}/>
            <H2>{title}</H2>
            <SpecialPanel 
                id={id}
                publishedAt={publishedAt} 
                margin="-20px 0 20px" 
                editButton={
                    <Icon
                        id="fa-pencil"
                        size="21px"
                        margin="0 7px 0 0"
                        onClick={() => navigate(`/post/${id}/edit`)}
                    />
                }
            />
            <div className="post-tex">{content}</div>
        </div>
    );
};

export const PostContent = styled(PostContentContainer)`
    & img {
        float: left;
        margin: 0 20px 10px 0;
    }

    & .post-tex {
        font-size: 18px;
        white-space: pre-line;
    }
`;