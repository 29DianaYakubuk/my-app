export const getUsers = () =>
    fetch('http://localhost:305/users').then((loadedUsers) => loadedUsers.json());
