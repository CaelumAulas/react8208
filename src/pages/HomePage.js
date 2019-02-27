import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Cabecalho from '../components/Cabecalho'
import NavMenu from '../components/NavMenu'
import '../components/NovoTweet/novoTweet.css';
// import NovoTweet from '../components/NovoTweet'
import Dashboard from '../components/Dashboard'
import Widget from '../components/Widget'
import TrendsArea from '../components/TrendsArea'
import TwitelumService from '../services/TwitelumService';
import Modal from '../components/Modal';

import Tweet from '../containers/TweetConectado'

class App extends Component {
    constructor() {
        super()
        this.state = {
            novoTweet: 'xablau',
            // tweets: [],
            // tweetAtivo: null
        }
        // this.adicionaEvento = this.adicionaEvento.bind(this)
        // console.log('constructor')
    }

    componentDidMount() {
        // window.store.subscribe(() => {
        //     const store = window.store.getState()

        //     this.setState({
        //         tweets: store.tweets,
        //         tweetAtivo: store.tweets
        //             .find(tweet => tweet._id === store.tweetAtivo)
        //     })
        // })

        // console.log('didMount')
        // TwitelumService.list()
        //     .then((tweetsDoServer) => {
        //         this.props.dispatch({
        //             type: 'LIST_TWEETS',
        //             payload: tweetsDoServer
        //         })
        //     })
            // - https://twitelum-api.herokuapp.com/tweets
        this.props.listTweets()
    }

    adicionaTweet = (infosDoEvento) => {
        infosDoEvento.preventDefault()

        this.props.addTweet(this.state.novoTweet)

        // TwitelumService.adiciona(this.state.novoTweet)
        //     .then((tweetQueVeioDoServer) => {
        //         this.setState({
        //             // tweets: [tweetQueVeioDoServer, ...this.props.tweets],
        //             novoTweet: ''
        //         })

        //         this.props.dispatch({
        //             type: 'ADD_TWEET',
        //             payload: tweetQueVeioDoServer
        //         })
        //     })
        //     .catch((err) => {
        //         console.error(err)
        //     })
        // Performance <------------------------------> Legibilidade
    }

    removeTweet = (idDoTweetQueVaiSumir) => {
        // const listaAtualizada = this.props.tweets.filter((tweetAtual) => tweetAtual._id !== idDoTweetQueVaiSumir)

        // this.setState({
        //     tweets: listaAtualizada,
        //     tweetAtivo: null
        // })

        this.props.remove(idDoTweetQueVaiSumir)
    }

    openTweet = (event, tweetSelecionado) => { // assinatura
        if (!event.target.closest('.tweet__footer')) {
            // this.setState({
            //     tweetAtivo: tweetSelecionado
            // })
            this.props.selectTweet(tweetSelecionado)
        }
    }

    fechaModal = (event) => {
        if (event.target.classList.contains('modal')) {
            this.setState({ tweetAtivo: null })
        }
    }

  render() {
    const { tweetAtivo } = this.props;

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
                            this.props.tweets.map((tweetAtual, indice) => {
                                return (
                                    <Tweet
                                        key={tweetAtual._id}
                                        id={tweetAtual._id}
                                        usuario={tweetAtual.usuario}
                                        totalLikes={tweetAtual.totalLikes}
                                        removivel={tweetAtual.removivel}
                                        handleRemove={() => this.removeTweet(tweetAtual._id)}
                                        handleClick={(event) => this.openTweet(event, tweetAtual)}
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

        <Modal isOpen={tweetAtivo} onClose={this.fechaModal} >
            {tweetAtivo && (
                <Tweet
                    id={tweetAtivo._id}
                    usuario={tweetAtivo.usuario}
                    totalLikes={tweetAtivo.totalLikes}
                    removivel={tweetAtivo.removivel}
                    handleRemove={() => this.removeTweet(tweetAtivo._id)}
                    likeado={tweetAtivo.likeado}
                >
                    {tweetAtivo.conteudo}
                </Tweet>
            )}
        </Modal>
      </Fragment>
    );
  }
}

function mapaDaStoreProComponente (store) {
    return {
        tweets: store.tweets,
        tweetAtivo: store.tweets
            .find(tweet => tweet._id === store.tweetAtivo)
    }
}

function mapaDasActions (dispatch) {
    return {
        listTweets: () => {
            TwitelumService.list()
                .then((tweetsDoServer) => {
                    dispatch({
                        type: 'LIST_TWEETS',
                        payload: tweetsDoServer
                    })
                })
        },
        selectTweet: (tweet) => {
            dispatch({
                type: 'SELECT_TWEET',
                payload: tweet
            })
        },
        removeTweet: (idDoTweetQueVaiSumir) => {
            dispatch({
                type: 'REMOVE_TWEET',
                payload: idDoTweetQueVaiSumir
            })
    
            TwitelumService.remove(idDoTweetQueVaiSumir)
                .then((resposta) => {
                    console.log('Dentro do componente', resposta)
                }) 
        },
        addTweet: (novoTweet) => {
            TwitelumService.adiciona(novoTweet)
                .then((tweetQueVeioDoServer) => {
                    this.setState({
                        // tweets: [tweetQueVeioDoServer, ...this.props.tweets],
                        novoTweet: ''
                    })

                    dispatch({
                        type: 'ADD_TWEET',
                        payload: tweetQueVeioDoServer
                    })
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    }
}

export default connect(mapaDaStoreProComponente, mapaDasActions)(App);
