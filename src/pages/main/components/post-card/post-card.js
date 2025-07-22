import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Icon } from '../../../../components';
import styled from 'styled-components';

const PostCardContainer = ({
    className,
    id,
    title,
    imageURL,
    publishedAt,
    commentsCount,
}) => {
    return (
        <div className={className}>
            <Link to={`/post/${id}`}>
                <img src={imageURL} alt={title} />
                <div className="post-card-footer">
                    <h4>{title}</h4>
                    <div className="post-card-info">
                        <div className="published-at">
                            <Icon
                                inactive={true}
                                id="fa-calendar-days"
                                size="18px"
                                margin="0 7px 0 0"
                            />
                            {publishedAt}
                        </div>
                        <div className="comments-count">
                            <Icon
                                inactive={true}
                                id="fa-comments"
                                size="18px"
                                margin="0 7px 0 0"
                            />
                            {commentsCount}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export const PostCard = styled(PostCardContainer)`
    width: 280px;
    flex-direction: column;
    display: flex;
    margin: 20px;
    border: 1px solid #ccc;

    & img  {
        display: block;
        width: 100%;
        }
    
    & .post-card-footer {
        padding: 5px;
        border-top: 1px solid #000;
    
        & h4 {
        margin: 0;
    }    
    & .post-card-info {
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
    }
    
    & .published-at,
    & .comments-count {
        display: flex;
        align-items: center;
    }
`;
PostCardContainer.propTypes = {
    
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    publishedAt: PropTypes.string.isRequired,
    commentsCount: PropTypes.number.isRequired,
};