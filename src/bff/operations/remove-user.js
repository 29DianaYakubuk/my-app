import { sessions } from "../sessions";
import { ROLE } from "../constants/index";
import { deleteUser } from "../api/index.js";

export const removeUser = async (hash, userId) => {
    const accessRoles = [ROLE.ADMIN];

   const access = await sessions.access(hash, accessRoles);
   if (!access) {
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