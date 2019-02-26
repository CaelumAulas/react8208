import { createStore } from 'redux';

// function reducer(stateAtualDaStore = 'nenhum bolinho', actionDisparada) {
//     console.log(actionDisparada.type);

//     if (actionDisparada.type === 'ASSAR_BOLINHOS') {
//         // return 'bolinho de caneca ' + actionDisparada.flavor
//         return 'bolinho de caneca ' + actionDisparada.payload
//     }

//     return stateAtualDaStore;
// }

function tweetsReducer(state = { tweets: [], tweetAtivo: null }, action) {
    if (action.type === 'LIST_TWEETS') {
        return { ...state, tweets: action.payload };

    } else if (action.type === 'LIKE_TWEET') {
        const newState = [ ...state.tweets ]
        const tweetLikeado = newState
            .find((tweet) => tweet._id === action.payload)

        if (tweetLikeado) {
            tweetLikeado.totalLikes += tweetLikeado.likeado ? -1 : 1
            tweetLikeado.likeado = !tweetLikeado.likeado
        }

        return { ...state, tweets: newState }

    } else if (action.type === 'SELECT_TWEET') {
        return { ...state, tweetAtivo: action.payload._id }
    }

    return state;
}

const store = createStore(tweetsReducer);

console.log('Store criada!');

export default store;
