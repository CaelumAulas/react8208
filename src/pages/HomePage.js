import React, { Component, Fragment } from 'react';
import Cabecalho from '../components/Cabecalho'
import NavMenu from '../components/NavMenu'
import '../components/NovoTweet/novoTweet.css';
// import NovoTweet from '../components/NovoTweet'
import Dashboard from '../components/Dashboard'
import Widget from '../components/Widget'
import TrendsArea from '../components/TrendsArea'
import Tweet from '../components/Tweet'
import TwitelumService from '../services/TwitelumService';
import Modal from '../components/Modal';

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
        fetch(`https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
            .then( res => res.json() )
            .then((tweetsDoServer) => {
                this.setState({
                    tweets: tweetsDoServer
                })
            })
            // - https://twitelum-api.herokuapp.com/tweets
    }

    adicionaTweet = (infosDoEvento) => {
        infosDoEvento.preventDefault()

        TwitelumService.adiciona(this.state.novoTweet)
            .then((tweetQueVeioDoServer) => {
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

    removeTweet = (idDoTweetQueVaiSumir) => {
        const listaAtualizada = this.state.tweets.filter((tweetAtual) => tweetAtual._id !== idDoTweetQueVaiSumir)

        this.setState({
            tweets: listaAtualizada
        })

        TwitelumService.remove(idDoTweetQueVaiSumir)
            .then((resposta) => {
                console.log('Dentro do componente', resposta)
            }) 
    }

  render() {
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
                                return (
                                    <Tweet
                                        key={tweetAtual._id}
                                        id={tweetAtual._id}
                                        usuario={tweetAtual.usuario}
                                        totalLikes={tweetAtual.totalLikes}
                                        removivel={tweetAtual.removivel}
                                        handleRemove={() => this.removeTweet(tweetAtual._id)}
                                        likeado={tweetAtual.likeado}>
                                        { tweetAtual.conteudo }
                                    </Tweet>
                                )
                            })
                         }
                    </div>
                </Widget>
            </Dashboard>
        </div>

        <Modal isOpen={ false } >
            <div>
                uhsdhuadshud
            </div>
        </Modal>
      </Fragment>
    );
  }
}

export default App;
