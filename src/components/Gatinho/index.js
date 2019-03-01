import React from 'react'

class Gatinho extends React.Component {
    state = { tempoDeVida: Math.random() }

    componentDidMount () {
        console.log('Um gatinho nasceu aqui!');
    }

    componentDidUpdate (prevProps, prevState) {
        console.log('Eu estou mudado!');

        console.log(prevState.tempoDeVida, this.state.tempoDeVida);
    }

    componentWillUnmount () {
        console.log('Eu morri');
    }

    render() {
        return <h1 onClick={() => this.setState({ tempoDeVida: Math.random() })}>Eu sou um gatinho</h1>;
    }
}

export default Gatinho;
