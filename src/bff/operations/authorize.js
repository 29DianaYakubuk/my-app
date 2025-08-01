import { getUser } from '../api/index.js';
import { sessions } from '../sessions.js';

export const authorize = async (authLogin, authPassword) => {
       const user = await getUser(authLogin);

       if (!user) {
           return {
               error: 'User not found',
               res: null,
           };
       }
       const {id, login, password, roleId} = user;

       if (authPassword !== password) {
           return {
               error: ('Invalid password'),
               res: null,
           };
       }

        return {
            error: null,
            res:{
                id,
                login,
                roleId,
                session: sessions.create(user),
            },
        };
}