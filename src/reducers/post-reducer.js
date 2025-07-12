import { ACTION_TYPE } from "../actions";

const initialPostState = {
    id:'null',
    title: '',
    content: '',
    imageUrl: '',
    publishedAt: '',
    comments: [],

};

export const postReducer = (state = initialPostState, action) => {
    switch (action.type) {
        case ACTION_TYPE.SET_POST_DATA:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};