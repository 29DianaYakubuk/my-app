import { sessions } from "../sessions";
import { ROLE } from "../constants/index";
import { deleteUser } from "../api/index.js";

export const removeUser = async (userSession, userId) => {
    const accessRoles = [ROLE.ADMIN];

    if (!sessions.access(userSession, accessRoles)) {
        return {
            error: 'Access denied',
            res: null,
        };
    }

   deleteUser(userId);
    return {
        error: null,
        res: true,
    };
};