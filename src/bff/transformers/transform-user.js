export const transformUser = (dbUser) => ({
    id: dbUser.id,
    login: dbUser.login,
    roleId: dbUser.role_id,
    registeredAt: dbUser.registed_at,
    password: dbUser.password,
});

