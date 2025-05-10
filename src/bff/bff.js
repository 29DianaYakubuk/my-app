import {getUser} from './get-users'
import { addUser } from './add-user';
import {createSession} from './create-session';

export const server = {
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
            res: createSession(user.role_id),
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
                res: createSession(user.role_id),
            };
        },

    };