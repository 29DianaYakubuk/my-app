import styled from 'styled-components';
import { Icon } from '../../../../components/icon/icon';


const SpecialPanelContainer = ({ className, publishedAt, editButton }) => {
    return (
        <div className={className}>
            <div className="published-at">
                <Icon id="fa-calendar-days" margin="0 7px 0 0" onClick={() => {}} 
                 />
                 {publishedAt}
            </div>
        <div className="buttons">
            {editButton}
            <Icon id="fa-trash-can" margin="0 7px 0 0" onClick={() => {}} />
        </div>
        </div>
    );
};
export const SpecialPanel = styled(SpecialPanelContainer)`
    display: flex;
    justify-content: space-between;
    margin: ${({ margin }) => margin};

    & .published-at {
        display: flex;
        align-items: center;
        color: #666;
        font-size: 14px;
        margin-bottom: 10px;
        cursor: pointer;
        transition: color 0.3s;
    }

    & .buttons {
        display: flex;
    }
    
    & i {
        position: relative;
        top: -1px;
    }
`;