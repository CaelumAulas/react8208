import React, { Component, Fragment } from 'react';
import Cabecalho from '../components/Cabecalho'
import NavMenu from '../components/NavMenu'
import '../components/NovoTweet/novoTweet.css';
// import NovoTweet from '../components/NovoTweet'
import Dashboard from '../components/Dashboard'
import Widget from '../components/Widget'
import TrendsArea from '../components/TrendsArea'
import Tweet from '../components/Tweet'


c

class App extends Component {
    constructor() {
        super()
        this.state = {
            novoTweet: 'xablau',
            tweets: []
        }
        // this.adicionaEvento = this.adicionaEvento.bind(this)
        console.log('constructor')
    }

    componentDidMount() {
        console.log('didMount')
        // Façam o códego que pega os tweets do server:
            // - https://twitelum-api.herokuapp.com/tweets
    }

    adicionaTweet = (infosDoEvento) => {
        infosDoEvento.preventDefault()
        

        fetch(`https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
            method: 'POST',
            body: JSON.stringify({ conteudo: this.state.novoTweet })
        })
        .then((respostaDoServer) => {
            if(respostaDoServer.ok) return respostaDoServer.json()
            
            throw new Error('Deu merda :(') 
        })
        .then((tweetQueVeioDoServer) => {
            console.log(tweetQueVeioDoServer)
            this.setState({
                tweets: [tweetQueVeioDoServer, ...this.state.tweets],
                novoTweet: ''
            })
        })
        .catch((err) => {
            console.error(err)
        })
        
        // Performance <------------------------------> Legibilidade
    }

  render() {
    console.log('render')
    return (
      <Fragment>
        <Cabecalho>
            <NavMenu usuario="@omariosouto" />
        </Cabecalho>
        <div className="container">
            <Dashboard>
                <Widget>
                    <form className="novoTweet" onSubmit={this.adicionaTweet}>
                        <div className="novoTweet__editorArea">
                        <span className={`novoTweet__status ${
                                this.state.novoTweet.length > 140
                                    ? 'novoTweet__status--invalido'
                                    : '' }
                        `}>
                            {this.state.novoTweet.length}/140
                        </span>
                        <textarea 
                            value={this.state.novoTweet}
                            onChange={(infosDoEvento) => {
                                this.setState({
                                    novoTweet: infosDoEvento.target.value
                                })
                            }}
                            className="novoTweet__editor"
                            placeholder="O que está acontecendo?"></textarea>
                        </div>
                        <button disabled={this.state.novoTweet.length <= 0 || this.state.novoTweet.length > 140} type="submit" className="novoTweet__envia">Tweetar</button>
                    </form>
                </Widget>
                <Widget>
                    <TrendsArea />
                </Widget>
            </Dashboard>
            <Dashboard posicao="centro">
                <Widget>
                    <div className="tweetsArea">
                        { 
                            this.state.tweets.map((tweetAtual, indice) => {
                                console.log(tweetAtual)
                                return (
                                    <Tweet
                                        key={indice}
                                        usuario={tweetAtual.usuario}
                                        likes={tweetAtual.totalLikes}>
                                        { tweetAtual.conteudo }
                                    </Tweet>
                                )
                            })
                         }
                    </div>
                </Widget>
            </Dashboard>
        </div>
      </Fragment>
    );
  }
}

export default App;
