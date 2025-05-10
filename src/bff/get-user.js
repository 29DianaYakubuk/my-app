import { getUsers} from './get-users.js';

export  const getUser = async(existingUsers, loginToFind) => {
    const users = await getUsers();
    return users.find(( {login}) => login === loginToFind);
};
