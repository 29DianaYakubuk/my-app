import{ generateDate} from './generate-date';

export const addUser = (login, password) =>
    fetch('http://localhost:305/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            login,
            password,
            role_id: 2,
            created_at: generateDate(),
        }),
    });
