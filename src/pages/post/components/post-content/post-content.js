import styled from 'styled-components';
import { H2 } from '../../../../components/h2/h2';
import { Icon } from '../../../../components';

const PostContentContainer = ({
    className,
    post: {
        id, title, imageUrl, content, publishedAt} }) => {
    return (
        <div className={className}>
            {imageUrl?.trim() && <img src={imageUrl} alt={title} />}
            <H2>{title}</H2>
            <div className="special-panel">
                <div className="published-at">
                    <Icon
                        id="fa-calendar-days"
                        margin="0 7px 0 0"
                        onClick={() => {}}
                    />
                    {publishedAt}
                </div>
                <div className="buttons">
                    <Icon
                        id="fa-pencil"
                        margin="0 7px 0 0"
                        onClick={() => {}}
                    />
                    <Icon
                        id="fa-trash-can"
                        margin="0 7px 0 0"
                        onClick={() => {}}
                    />
                </div>
            </div>
            <div className="post-tex">{content}</div>
        </div>
    );
};

export const PostContent = styled(PostContentContainer)`
    max-width: 800px;
    margin: 40px auto;
    padding: 0 20px;
    line-height: 1.6;
    font-size: 16px;

    & img {
        display: block;
        max-width: 100%;
        height: auto;
        margin: 20px auto;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    & h2 {
        text-align: center;
        font-size: 1.8rem;
        margin: 30px 0 20px;
        white-space: pre-line;
    }

    & .special-panel,
    .post-tex {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: justify;
        color: #333;
        white-space: pre-line;
    }

    & .published-at {
        display: flex;
        align-items: center;
        color: #666;
        font-size: 14px;
        margin-bottom: 10px;
        cursor: pointer;
        transition: color 0.3s;
    }
    & i {
        position: relative;
        top: -1px;
        font-size: 18px;
        }

    & .buttons {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
    }
`;
