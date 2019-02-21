import React, { Component, Fragment } from 'react';
import Cabecalho from '../components/Cabecalho'
import NavMenu from '../components/NavMenu'
import '../components/NovoTweet/novoTweet.css';
// import NovoTweet from '../components/NovoTweet'
import Dashboard from '../components/Dashboard'
import Widget from '../components/Widget'
import TrendsArea from '../components/TrendsArea'
import Tweet from '../components/Tweet'

class App extends Component {
    constructor() {
        super()
        this.state = {
            novoTweet: 'xablau',
            tweets: ['Tweet falso', 'Tweet falso 2']
        }
        // this.adicionaEvento = this.adicionaEvento.bind(this)
    }

    adicionaTweet = (infosDoEvento) => {
        infosDoEvento.preventDefault()
        console.log('Capturando o evento', this)
        // this.state.tweets.push(this.state.novoTweet)
        this.setState({
            tweets: [this.state.novoTweet, ...this.state.tweets],
            novoTweet: ''
        })
        // Performance <------------------------------> Legibilidade
    }

  render() {
    console.log('render executou')
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
                                        key={indice}
                                        user="@qualquercoisa"
                                        name="Guilhermino da Silva"
                                        likes="34">
                                        { tweetAtual }
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
