export default class TwitelumService {
    static adiciona(conteudo) {
        return fetch(`https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
            method: 'POST',
            body: JSON.stringify({ conteudo })
        })
        .then((respostaDoServer) => {
            if(respostaDoServer.ok) return respostaDoServer.json()
            
            throw new Error('Deu merda :(') 
        })
    }

    static async remove(idDoTweetQueVaiSumir) {
        const respostaDoServer = await fetch(`https://twitelum-api.herokuapp.com/tweets/${idDoTweetQueVaiSumir}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
            method: 'DELETE' 
        })
        
        if(respostaDoServer.ok) {
            return respostaDoServer.json()
        }

        throw new Error('Deu merda :)')
    }
}
