import {Icon} from '../../../../components/icon/icon';
import { Button } from '../../../../components/button/button';
import styled from 'styled-components';
import {faBackward, faFileText, faUsers} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { selectUserRole, selectUserLogin, selectUserSession } from '../../../../selectors';
import { ROLE } from '../../../../constants/role';
import { logout } from '../../../../actions/logout';
import { useDispatch } from 'react-redux';

const RightAligned = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const icons = {
    "fa-backward": faBackward,
    "fa-file-text-o": faFileText,
    "fa-users": faUsers,
};

const StyledIcon = styled.div`
    &:hover {
        cursor: pointer;
    }
`;


const UserName = styled.div`
font-size: 18px;
font-weight: bold;
`;

const ControlPanelContainer = ({ClassName}) => {
    const navigate = useNavigate();
    const roleId = useSelector(selectUserRole);
    const login = useSelector((state) =>
        selectUserLogin(state.auth || { user: {} }),
    );

    const dispatch = useDispatch();
   const session = useSelector((state) =>
       selectUserSession(state.auth || { user: {} }),
   );
   console.log('🔍 Debug: session =', session);
    return (
        <div className={ClassName}>
            <RightAligned>
                {roleId === ROLE.GUEST ? (
                    <Button>
                        <Link to="/login">Enter</Link>
                    </Button>
                ) : (
                    <>
                        <UserName>{login}</UserName>
                        <StyledIcon>
                            <Icon
                                id="fa-sign-out"
                                margin="0 0 0 10px"
                                onClick={() => dispatch(logout(session))}
                            />
                        </StyledIcon>
                    </>
                )}
            </RightAligned>
            <RightAligned>
                <StyledIcon onClick={() => navigate(-1)}>
                    <Icon id="fa-backward" margin="10px 0 0 0" />
                </StyledIcon>
                <Link to="/post">
                    <Icon id="fa-file-text-o" margin="10px 0 0 16px" />
                </Link>
                <Link to="/users">
                    <Icon id="fa-users" margin="10px 0 0 16px" />
                </Link>
            </RightAligned>
        </div>
    );
};

export const ControlPanel = styled(ControlPanelContainer)``;
