
import { useCallback } from 'react';
import { server } from '../bff/index.js';
import { useSelector } from 'react-redux';
import { selectUserSession } from '../selectors';

export const useServerRequest = () => {
    const session = useSelector(selectUserSession);

    return useCallback(
        (operation, ...params) => {
            const request = ['register', 'authorize', 'fetchPost', 'fetchPosts'].includes(operation)
                ? params
                : [session, ...params];

            return server[operation](...request);
        },
        [session],
    );
};
