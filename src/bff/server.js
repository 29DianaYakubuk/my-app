import { authorize, logout, register, fetchUsers, fetchRoles, updateUserRole, removeUser } from "./operations/index.js";

export const server = {
    authorize,
    logout,
    register,
    fetchUsers,
    fetchRoles,
    updateUserRole,
    removeUser,
};
