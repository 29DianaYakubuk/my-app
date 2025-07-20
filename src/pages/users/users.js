
import styled from 'styled-components';
import { UserRow } from './components/user-row/user-row';
import { TableRow } from './components/table-row/table-row';
import {PrivateContent} from '../../components/private-content/private-content';
import {useServerRequest} from '../../hooks/use-server-request';
import { useEffect, useState } from 'react';
import { H2 } from '../../components';
import { ROLE } from '../../bff/constants';
import {checkAccess} from '../../utils/check-access';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';

const UsersContainer = ({className}) => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);
    const requestServer = useServerRequest();
    const userRole = useSelector(selectUserRole);

   useEffect(() => {
    if (!checkAccess([ROLE.ADMIN], userRole)) {
        return;
    }
        Promise.all([
            requestServer('fetchUsers'),
            requestServer('fetchRoles')
        ]).then(([usersRes, rolesRes]) => {
        if (usersRes.error || rolesRes.error) {
            setErrorMessage(usersRes.error || rolesRes.error);
            return;
        }

        setUsers(usersRes.res);
        setRoles(rolesRes.res);
    },
);

   }, [requestServer, shouldUpdateUserList, userRole]);

   const onUserRemove = (userId) => {
            if (!checkAccess([ROLE.ADMIN], userRole)) {
                return;
            }
         requestServer('removeUser', userId).then(() => {
              setShouldUpdateUserList(!shouldUpdateUserList);
         });
   };

   return (
       <div className={className}>
           <PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
                <H2>Users</H2>
                <div>
                    <TableRow>
                        <div className="login-column">Login</div>
                        <div className="registerd-at-column"> Date of registration</div>
                        <div className="role-column">Role</div>
                    </TableRow>
                    {[...users].map(({ id, login, registeredAt, roleId }) => (
                   <UserRow
                       key={id}
                       id={id}
                       login={login}
                       registeredAt={registeredAt}
                       roleId={roleId}
                       roles={roles.filter(({ id: roleId}) => roleId !== ROLE.GUEST)}
                       onUserRemove={() => onUserRemove(id)}
                   />
                ))}
                </div>
           </PrivateContent>
       </div>
   );

};

export const Users = styled(UsersContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 570px;
    margin: 0 auto;
    font-size: 18px;

`;

