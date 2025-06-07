import { getUser } from './get-user';
import { addUser } from './add-user';
import { sessions } from './sessions';

export const server = {
    async logout(session) {
        session.remove(session);
    },
    async authorize(authLogin, authPassword) {
       const user = await getUser(authLogin);

       if (!user) {
           return {
               error: 'User already exists',
               res: null,
           };
       }
       if (user.password !== authPassword) {
           return {
               error: ('Invalid login or password'),
               res: null,
           };
       }

        return {
            error: null,
            res:{
                id: user.id,
                login: user.login,
                roleId: user.role_id,
                session: sessions.create(user),
            },
        };
    },
    async register(regLogin, regPassword) {
        const user = await getUser(regLogin);
        if (user) {
            return {
                Error: ('User already exists'),
                res: null,
            };
        }
        await addUser(regLogin, regPassword);
        return {
            error: null,
            res: {
                id: user.id,
                login: user.login,
                roleId: user.role_id,
                session: sessions.create(user),
            },
        };
    },
};