import { useState } from 'react';
import { useServerRequest} from '../../../../hooks/use-server-request';
import { Icon } from '../../../../components';
import styled from 'styled-components';
import { TableRow } from '../table-row/table-row';


const UserRowContainer = ({
    className,
    id,
    login,
    registeredAt,
    roleId: userRoleId,
    roles,
    onUserRemove,
}) => {
    const [initialRoleId, setInitialRoleId] = useState(userRoleId);
    const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);
    const requestServer = useServerRequest();

    const onRoleChange = ({target}) => {
        setSelectedRoleId(Number(target.value));
    };

    const onRoleSave = (userId, newUserRoleId) => {
        requestServer('updateUserRole', userId, newUserRoleId).then(() => {
            setInitialRoleId(newUserRoleId);
        });
    };

    const isSaveButtonDisabled = selectedRoleId === initialRoleId;

    return (
        <div className={className}>
            <TableRow border={true}>
                <div className="login-column">{login}</div>
                <div className="registered-at-column">{registeredAt}</div>
                < div className="role-column">
                    <select value={selectedRoleId} onChange={onRoleChange}>
                        {roles.map(({ id: roleId, name: roleName }) => (
                            <option key={roleId} value={roleId}>
                                {roleName}
                            </option>
                        ))}
                    </select>
                        <Icon
                            id="fa-floppy-disk" margin="0 0 0 10px" disabled={isSaveButtonDisabled}
                            onClick={() => onRoleSave(id, selectedRoleId)}
                        />
                </div>
            </TableRow>
            <Icon
                id="fa-trash-can"
                margin="0 0 0 10px"
                onClick={onUserRemove}
            />
        </div>
    );
};

export const UserRow = styled(UserRowContainer)`
display: flex;
border: 1px solid #000;
margin: 10px 0;

&  select {
   font-size: 16px;
    padding: 0 5px;
}

`;
