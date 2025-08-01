import { ROLE } from '../constants/index';
import { getRoles } from '../api/get-roles';
import { sessions } from '../sessions';

export const fetchRoles = async (hash) => {
    const accessRoles = [ROLE.ADMIN];

    const access = await sessions.access(hash, accessRoles);
    if (!access) {
        return {
            error: 'Access denied',
            res: null,
        };
    }

    const roles = await getRoles();

    return {
        error: null,
        res: roles,
    };
};
