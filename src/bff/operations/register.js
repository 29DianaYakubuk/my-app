import { addUser, getUser } from '../api';
import { sessions } from '../sessions';

export const register = async (regLogin, regPassword) => {
    const existedUser = await getUser(regLogin);

    if (existedUser) {
        return {
            error: ('User already exists'),
            res: null,
        };
    }

    const user = await addUser(regLogin, regPassword);

    return {
        error: null,
        res: {
            id: user.id,
            login: user.login,
            roleId: user.role_id,
            session: sessions.create(user),
        },
    };
}
