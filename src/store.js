import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
import { appReducer, userReducer, usersReducer, postReducer, postsReducer } from './reducers';

const reducer = combineReducers({
    app: appReducer,
    user: userReducer,
    users: usersReducer,
    post: postReducer,
    posts: postsReducer,
});

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

export const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
));
