import React, { Component } from 'react';

import './novoTweet.css';

class NovoTweet extends Component {
  state = { novoTweet: 'clojures são lindas' }

  adicionaTweet = (event) => {
    event.preventDefault()

    this.props.addTweet(this.state.novoTweet)
      .then(() => this.setState({ novoTweet: '' }))
  }

  render() {
    const { novoTweet } = this.state;

    return (
      <form className="novoTweet" onSubmit={this.adicionaTweet}>
        <div className="novoTweet__editorArea">
          <span className={`novoTweet__status ${
            novoTweet.length > 140
              ? 'novoTweet__status--invalido'
              : ''}
            `}
          >
            {novoTweet.length}/140
          </span>
          <textarea
            value={novoTweet}
            onChange={(infosDoEvento) => {
              this.setState({
                novoTweet: infosDoEvento.target.value
              })
            }}
            className="novoTweet__editor"
            placeholder="O que está acontecendo?"></textarea>
        </div>
        <button disabled={novoTweet.length <= 0 || novoTweet.length > 140} type="submit" className="novoTweet__envia">Tweetar</button>
      </form>
    );
  }
}

export default NovoTweet;