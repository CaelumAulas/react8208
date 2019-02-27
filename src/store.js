import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

// function reducer(stateAtualDaStore = 'nenhum bolinho', actionDisparada) {
//     console.log(actionDisparada.type);

//     if (actionDisparada.type === 'ASSAR_BOLINHOS') {
//         // return 'bolinho de caneca ' + actionDisparada.flavor
//         return 'bolinho de caneca ' + actionDisparada.payload
//     }

//     return stateAtualDaStore;
// }

const actions = {
    'LIST_TWEETS': (state, payload) => ({
        ...state, tweets: payload
    }),

    'LIKE_TWEET': (state, payload) => {
        const newState = [...state.tweets]
        const tweetLikeado = newState
            .find((tweet) => tweet._id === payload)

        if (tweetLikeado) {
            tweetLikeado.totalLikes += tweetLikeado.likeado ? -1 : 1
            tweetLikeado.likeado = !tweetLikeado.likeado
        }

        return { ...state, tweets: newState }
    },

    'SELECT_TWEET': (state, payload) => ({ ...state, tweetAtivo: payload._id }),

    'ADD_TWEET': (state, payload) => ({
        ...state,
        tweets: [payload, ...state.tweets]
    }),

    'REMOVE_TWEET': (state, payload) => ({
        ...state,
        tweets: state.tweets.filter(tweet => tweet._id !== payload)
    })
};

function tweetsReducer(state = { tweets: [], tweetAtivo: null }, action) {
    // if (action.type === 'LIST_TWEETS') {
    //     return { ...state, tweets: action.payload };

    // } else if (action.type === 'LIKE_TWEET') {
    //     const newState = [ ...state.tweets ]
    //     const tweetLikeado = newState
    //         .find((tweet) => tweet._id === action.payload)

    //     if (tweetLikeado) {
    //         tweetLikeado.totalLikes += tweetLikeado.likeado ? -1 : 1
    //         tweetLikeado.likeado = !tweetLikeado.likeado
    //     }

    //     return { ...state, tweets: newState }
    // } else if (action.type === 'SELECT_TWEET') {
    //     return { ...state, tweetAtivo: action.payload._id }
    // } else if (action.type === 'ADD_TWEET') {
    //     return {
    //         ...state,
    //         tweets: [action.payload, ...state.tweets]
    //     }
    // } else if (action.type === 'REMOVE_TWEET') {
    //     return {
    //         ...state,
    //         tweets: state.tweets.filter(tweet => tweet._id !== action.payload)
    //     }
    // }

    if (actions[action.type]) {
        return actions[action.type](state, action.payload);
    }

    return state;
}

// const store = createStore(tweetsReducer);

const store = createStore(
    tweetsReducer,
    applyMiddleware(
        reduxThunk
    )
)

console.log('Store criada!');

export default store;
