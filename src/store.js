import { createStore } from 'redux';

// function reducer(stateAtualDaStore = 'nenhum bolinho', actionDisparada) {
//     console.log(actionDisparada.type);

//     if (actionDisparada.type === 'ASSAR_BOLINHOS') {
//         // return 'bolinho de caneca ' + actionDisparada.flavor
//         return 'bolinho de caneca ' + actionDisparada.payload
//     }

//     return stateAtualDaStore;
// }

function tweetsReducer(state = [], action) {
    if (action.type === 'LIST_TWEETS') {
        return action.payload;
    }

    return state;
}

const store = createStore(tweetsReducer);

console.log('Store criada!');
window.store = store;
