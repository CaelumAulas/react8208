import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';

import './index.css';

import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Modal from '../../components/Modal';

import Toaster from '../../containers/ToasterContainer';
import Tweet from '../../containers/TweetConectado'

import TwitelumService from '../../services/TwitelumService';

class Profile extends PureComponent {
    render() {
        return (
            <Fragment>
                <Cabecalho>
                    <NavMenu usuario="@omariosouto" />
                </Cabecalho>
                <div className="profile__banner" style={{ backgroundImage: 'url("https://pbs.twimg.com/profile_banners/932675351913926656/1511203272/1500x500")'}}>
                    <img className="profile__avatar" src="https://www.caelum.com.br/imagens/instrutores/fotos/mario-souto-120.jpg" />
                </div>
                <div className="container">
                    <Dashboard>
                        <Widget>
                        </Widget>
                        <Widget>
                            <TrendsArea />
                        </Widget>
                    </Dashboard>
                    <Dashboard posicao="centro">
                        <Widget>
                            {/* <div className="tweetsArea">
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
                                                {tweetAtual.conteudo}
                                            </Tweet>
                                        )
                                    })
                                }
                            </div> */}
                        </Widget>
                    </Dashboard>
                </div>

                {/* <Modal isOpen={tweetAtivo} onClose={this.fechaModal} >
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
                </Modal> */}
                <Toaster />
            </Fragment>
        );
    }
}

export default Profile;
