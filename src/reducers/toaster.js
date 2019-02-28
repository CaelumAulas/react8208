const toasterActions = {
    'NOTIFY': (state, payload) => ({
        ...state,
        message: payload.message,
        type: payload.type
    }),

    'CLEAR': state => ({ ...state, message: null })
};

export const initialState = {
    message: null,
    type: ''
};

function toasterReducer (state = initialState, action) {
    if (toasterActions[action.type]) {
        return toasterActions[action.type](state, action.payload);
    }

    return state;
}

export default toasterReducer;
