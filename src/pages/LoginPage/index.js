import React, { Component, Fragment } from 'react'
import Cabecalho from '../../components/Cabecalho'
import Widget from '../../components/Widget'
import './LoginPage.css'

class LoginPage extends Component {
    state = {
        errorMessage: '',
    }

    logar = (infosDoEvento) => {
        infosDoEvento.preventDefault()
        const dadosDoLogin = {
            login: this.refs.inputLogin.value,
            senha: this.refs.inputSenha.value
        }

        fetch('https://twitelum-api.herokuapp.com/login', {
                method: 'POST',
                body: JSON.stringify(dadosDoLogin)
            })
            .then((response) => {
                if(response.status === 404) {
                    throw new Error('Erro fudido sla...')
                }
                return response.json()
            })
            .then((respostaConvertidaEmObjeto) => {
                console.log(respostaConvertidaEmObjeto.token)
                localStorage.setItem('TOKEN', respostaConvertidaEmObjeto.token)
                this.props.history.push('/')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <Fragment>
                <Cabecalho />
                <div className="loginPage">
                    <div className="container">
                        <Widget>
                            <h2 className="loginPage__title">Seja bem vindo!</h2>
                            <form className="loginPage__form" onSubmit={this.logar}>
                                <div className="loginPage__inputWrap">
                                    <label className="loginPage__label" htmlFor="login">Login</label> 
                                    <input ref="inputLogin" className="loginPage__input" type="text" id="login" name="login"/>
                                </div>
                                <div className="loginPage__inputWrap">
                                    <label className="loginPage__label" htmlFor="senha">Senha</label> 
                                    <input ref="inputSenha" className="loginPage__input" type="password" id="senha" name="senha"/>
                                </div>
                                {/* <div className="loginPage__errorBox">
                                    { this.state.errorMessage }
                                </div> */}
                                <div className="loginPage__inputWrap">
                                    <button className="loginPage__btnLogin" type="submit">
                                        Logar
                                    </button>
                                </div>
                            </form>
                        </Widget>
                    </div>
                </div>
            </Fragment>
        )
    }
}


export default LoginPage