import {Icon} from '../../../../components/icon/icon';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBackward, faFileText, faUsers} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const RightAligned = styled.div`
    display: flex;
    justify-content: flex-end;
`;
const StyledLink = styled(Link)`
    display:flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    width: 100px;
    height: 32px;
    border-radius: 4px;
    background: #007bff;
    padding: 8px;
    text-align: center;
    margin: 10px 0;
    &:hover {
        background: #0056b3;
    }
`;
const icons = {
    "fa-backward": faBackward,
    "fa-file-text-o": faFileText,
    "fa-users": faUsers,
};
const StyledButton = styled.div`
    &:hover {
        cursor: pointer;
    }
`;

const ControlPanelContainer = ({ClassName}) => {
    const navigate = useNavigate();
    return (
        <div className={ClassName}>
            <RightAligned>
                <StyledLink to="/login">Enter</StyledLink>
            </RightAligned>
            <RightAligned>
                <a onClick={()=> navigate(-1)}>
                    <FontAwesomeIcon
                        icon={icons['fa-backward']}
                        style={{ margin: '10px 0 0 0' }}
                    />
                </a>
                <Link to="/post">
                    <FontAwesomeIcon
                        icon={icons['fa-file-text-o']}
                        style={{ margin: '10px 0 0 16px' }}
                    />
                </Link>
                <Link to="/users">
                    <FontAwesomeIcon
                        icon={icons['fa-users']}
                        style={{ margin: '10px 0 0 16px' }}
                    />
                </Link>
            </RightAligned>
        </div>
    );
};

export const ControlPanel = styled(ControlPanelContainer)``;
