const actionsTweets = {
    'LIST_TWEETS': (state, payload) => ({
        ...state, list: payload
    }),

    'LIKE_TWEET': (state, payload) => {
        const newState = [...state.list]
        const tweetLikeado = newState
            .find((tweet) => tweet._id === payload)

        if (tweetLikeado) {
            tweetLikeado.totalLikes += tweetLikeado.likeado ? -1 : 1
            tweetLikeado.likeado = !tweetLikeado.likeado
        }

        return { ...state, list: newState }
    },

    'SELECT_TWEET': (state, payload) => ({ ...state, tweetAtivo: payload._id }),

    'CLEAR_TWEET': state => ({ ...state, tweetAtivo: null }),

    'ADD_TWEET': (state, payload) => ({
        ...state,
        list: [payload, ...state.list]
    }),

    'REMOVE_TWEET': (state, payload) => ({
        ...state,
        list: state.list.filter(tweet => tweet._id !== payload)
    })
};

const initialState = {
    list: [],
    tweetAtivo: null
};

function tweetsReducer(state = initialState, action) {
    if (actionsTweets[action.type]) {
        return actionsTweets[action.type](state, action.payload);
    }

    return state;
}

export default tweetsReducer;
