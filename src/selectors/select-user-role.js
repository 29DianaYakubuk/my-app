import { ROLE } from '../constants/role.js';

export const selectUserRole = ({ user }) => user?.roleId || ROLE.GUEST;
