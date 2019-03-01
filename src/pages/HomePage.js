import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import '../components/NovoTweet/novoTweet.css';

import Cabecalho from '../components/Cabecalho'
import NavMenu from '../components/NavMenu'
import NovoTweet from '../components/NovoTweet'
import Dashboard from '../components/Dashboard'
import Widget from '../components/Widget'
import TrendsArea from '../components/TrendsArea'
import TwitelumService from '../services/TwitelumService';
import Modal from '../components/Modal';
// import Gatinho from '../components/Gatinho';

import Toaster from '../containers/ToasterContainer';
import Tweet from '../containers/TweetConectado'

class App extends Component {
    componentDidMount() {
        this.props.listTweets()
    }

    componentDidCatch (e) {
        console.log('error:')
        console.error(e);
    }

    openTweet = (event, tweetSelecionado) => { // assinatura
        if (!event.target.closest('.tweet__footer') && !event.target.closest('a')) {
            this.props.selectTweet(tweetSelecionado)
        }
    }

    fechaModal = (event) => {
        if (event.target.classList.contains('modal')) {
            this.props.clearTweet();
        }
    }

  render() {
    const { addTweet, tweetAtivo, removeTweet } = this.props;

    return (
      <Fragment>
        {/* <Gatinho /> */}
        <Cabecalho>
            <NavMenu usuario="@omariosouto" />
        </Cabecalho>
        <div className="container">
            <Dashboard>
                <Widget>
                    <NovoTweet addTweet={addTweet} />
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
                                        handleRemove={() => removeTweet(tweetAtual._id)}
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
        <Toaster />
      </Fragment>
    );
  }
}

function mapaDaStoreProComponente (store) {
    return {
        tweets: store.tweets.list,
        tweetAtivo: store.tweets.list
            .find(tweet => tweet._id === store.tweets.tweetAtivo)
    }
}

function mapaDasActions (dispatch) {
    return {
        listTweets: () => TwitelumService.list(dispatch),

        selectTweet: tweet => dispatch({ type: 'SELECT_TWEET', payload: tweet }),

        clearTweet: () => dispatch({ type: 'CLEAR_TWEET' }),

        removeTweet: async tweetId => dispatch(await TwitelumService.remove(tweetId)),

        addTweet: novoTweet => dispatch(TwitelumService.adiciona(novoTweet)),
    }
}

export default connect(mapaDaStoreProComponente, mapaDasActions)(App);
