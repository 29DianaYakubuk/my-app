import { getSession, addSession, deleteSession } from "./api";

export const sessions ={
    create(user) {
        const hash = Math.random().toString(36).substring(2, 15);
        addSession(hash, user);
            
        return hash;
    },
    async remove(hash){
        const session = await getSession(hash);
       
    if (!session) {
        return;
    }
        deleteSession(session.id);
    },

    async access(hash, accessRoles) {
    const dbSession = await getSession(hash);

   if (!dbSession || !dbSession.user) {
    return false;
   }

  return accessRoles.includes(dbSession.user.roleId);
}
};
