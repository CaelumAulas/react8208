import React, { PureComponent } from 'react'
import propTypes from 'prop-types'

import './tweet.css'

class Tweet extends PureComponent {
    constructor(props) {
        super()
        // this.state = {
            // totalLikes: props.totalLikes,
            // likeado: props.likeado
        // }
    }

    static propTypes = {
        // usuario: propTypes.object,
        usuario: propTypes.shape({
            nome: propTypes.string.isRequired,
            foto: propTypes.string.isRequired
        }),
        likeado: propTypes.bool,
        removivel: propTypes.bool,
        // children: propTypes.oneOfType([])
        children: propTypes.node.isRequired,
        handleRemove: propTypes.func,
        handleClick: propTypes.func
    }

    static defaultProps = {
        removivel: false,
        likeado: false,
        handleClick: () => null,
        handleRemove: () => null
    }

    like = () => {
        // console.log('Tentando dar um like', this.state.likeado)
        // const { likeado, totalLikes } = this.state

        // this.setState({
            // totalLikes: likeado ? totalLikes - 1 : totalLikes + 1,
            // likeado: !likeado
        // })

        this.props.onLike(this.props.id)

        fetch(`https://twitelum-api.herokuapp.com/tweets/${this.props.id}/like?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
            method: 'POST'
        })
        .then((res) => { console.log('Status', res) })
    }

    btnIconHeartState = () => this.props.likeado ? 'iconHeart--active' : ''
    
    
    render() {
        const { usuario, removivel, handleClick, handleRemove, children } = this.props;

        return (
            <article className="tweet" onClick={(event) => handleClick(event)} >
                <div className="tweet__cabecalho">
                    <img className="tweet__fotoUsuario" src={usuario.foto} alt="" />
                    <span className="tweet__nomeUsuario">
                        {usuario.nome}
                    </span>
                    <a href="/">
                        <span className="tweet__userName">
                            @{usuario.login}
                        </span>
                    </a>
                </div>
                <p className="tweet__conteudo">
                    <span>
                        {children}
                    </span>
                </p>
                <footer className="tweet__footer">
                    {
                        removivel && (
                            <button className="btn--blue btn--remove" onClick={handleRemove} >
                                X
                            </button>
                        )
                    }
                    <button className="btn btn--clean" onClick={this.like}>
                        <svg
                            className={`icon icon--small iconHeart ${ this.btnIconHeartState() }`}
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.5 47.5">
                            <defs>
                                <clipPath id="a">
                                    <path d="M0 38h38V0H0v38z"></path>
                                </clipPath>
                            </defs>
                            <g clipPath="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
                                <path d="M36.885 25.166c0 5.45-4.418 9.868-9.867 9.868-3.308 0-6.227-1.632-8.018-4.128-1.79 2.496-4.71 4.129-8.017 4.129-5.45 0-9.868-4.418-9.868-9.868 0-.773.098-1.52.266-2.242C2.75 14.413 12.216 5.431 19 2.965c6.783 2.466 16.249 11.448 17.617 19.96.17.721.268 1.47.268 2.241"></path>
                            </g>
                        </svg>
                        {this.props.totalLikes}
                    </button>
                </footer>
            </article>
        )
    }
}

export default Tweet