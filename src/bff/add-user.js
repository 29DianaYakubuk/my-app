import generateDate from './generate-date.js';

export const addUser = (login, password) =>
    fetch('http://localhost:3005/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            login,
            password,
            role_id: 2,
            registed_at: generateDate(),
        }),
    }).then((createdUser) => createdUser.json());
