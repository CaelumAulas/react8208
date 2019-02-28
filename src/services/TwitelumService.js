export default class TwitelumService {
    static adiciona = (conteudo) => (dispatch) => {
        return fetch(`https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
            method: 'POST',
            body: JSON.stringify({ conteudo })
        })
        .then((respostaDoServer) => {
            if(respostaDoServer.ok) return respostaDoServer.json()
            
            throw new Error('Deu merda :(') 
        })
        .then((tweetQueVeioDoServer) => {
            dispatch({
                type: 'ADD_TWEET',
                payload: tweetQueVeioDoServer
            })
        })
        .catch((err) => {
            console.error(err)
        })
    }

    static remove = async idDoTweetQueVaiSumir => async dispatch => {
        dispatch({
            type: 'REMOVE_TWEET',
            payload: idDoTweetQueVaiSumir
        })

        dispatch({
            type: 'NOTIFY',
            payload: {
                message: 'Tweet deletado',
                type: 'info'
            }
        })

        try {
            const respostaDoServer = await fetch(`https://twitelum-api.herokuapp.com/tweets/${idDoTweetQueVaiSumir}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
                method: 'DELETE' 
            })
            
            if (respostaDoServer.ok) return;
            throw new Error('Deu merda :)')
        } catch (e) {
            console.error(e);
        }
    }

    static async list(dispatch) {
        const respostaDoServer = await fetch(`https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
        
        if (!respostaDoServer.ok) throw new Error('Deu ruim');

        const payload = await respostaDoServer.json()

        dispatch({ type: 'LIST_TWEETS', payload })
    }

    static async like(idDoTweetCurtido) {
        return async (dispatch) => {
            const resposta = await fetch(`https://twitelum-api.herokuapp.com/tweets/${idDoTweetCurtido}/like?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
                method: 'POST'
            })
    
            if (resposta.ok) {
                // return res.json()
                return dispatch({
                    type: 'LIKE_TWEET',
                    payload: idDoTweetCurtido
                })
            }

            throw new Error('Deu ruim');
        }
    }
}
