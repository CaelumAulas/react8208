import React, { Component } from 'react';

import './novoTweet.css';

class NovoTweet extends Component {
  render() {
    return (
      <form className="novoTweet">
        <div className="novoTweet__editorArea">
          <span className="novoTweet__status">0/140</span>
          <textarea className="novoTweet__editor" placeholder="O que está acontecendo?"></textarea>
        </div>
        <button type="submit" className="novoTweet__envia">Tweetar</button>
      </form>
    );
  }
}

export default NovoTweet;