import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from '../../../../components/icon/icon';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, CLOSE_MODAL, removePostAsync } from '../../../../actions';
import { useServerRequest } from '../../../../hooks/use-server-request';
import { useNavigate } from 'react-router-dom'; // Assuming you have a Navigate function for redirection
import { checkAccess } from '../../../../utils';
import { ROLE } from '../../../../bff/constants/role';
import { selectUserRole } from '../../../../selectors/select-user-role';

const SpecialPanelContainer = ({ className, id, publishedAt, editButton }) => {
    const dispatch = useDispatch();
    const requestServer = useServerRequest();
    const navigate = useNavigate();
    const userRole = useSelector(selectUserRole);

    const onPostRemove = (id) => {
        dispatch(
            openModal({
                text: 'Delete post',
                onConfirm: () => {
                    dispatch(removePostAsync(requestServer, id)).then(() => {
                        navigate('/');
                    });
                    dispatch(CLOSE_MODAL);
                },
                onCancel: () => dispatch(CLOSE_MODAL),
            }),
        );
    };
    const isAdmin = checkAccess([ROLE.ADMIN], userRole);

    return (
        <div className={className}>
            <div className="published-at">
                {publishedAt && (
                    <Icon
                        inactive={true}
                        id="fa-calendar-days"
                        margin="0 7px 0 0"
                        size="18px"
                    />
                )}
                {publishedAt}
            </div>
            {isAdmin && (
                <div className="buttons">
                    {editButton}
                    {publishedAt && (
                        <Icon
                            id="fa-trash-can"
                            size="21px"
                            margin="0 0 0 7px"
                            onClick={() => onPostRemove(id)}
                        />
                    )}
                </div>
            )}
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

SpecialPanel.propTypes = {
    id: PropTypes.string.isRequired,
    publishedAt: PropTypes.string.isRequired,
    editButton: PropTypes.node.isRequired
};