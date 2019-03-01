import React, { Component, Fragment } from 'react'
import Cabecalho from '../../components/Cabecalho'
import Widget from '../../components/Widget'
import './LoginPage.css'

import { Formik, Form, Field } from 'formik';

class LoginPage extends Component {
    state = {
        errorMessage: '',
    }

    logar = (dadosDoLogin) => {
        fetch('https://twitelum-api.herokuapp.com/login', {
            method: 'POST',
            body: JSON.stringify(dadosDoLogin)
        })
            .then((response) => {
                if (response.status === 404) {
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

                            <Formik
                                initialValues={{
                                    login: '',
                                    senha: ''
                                }}
                                onSubmit={(parametro) => this.logar(parametro)}
                                render={({ handleChange, values, errors }) => (
                                    <Form className="loginPage__form">
                                        <div className="loginPage__inputWrap">
                                            <label className="loginPage__label" htmlFor="login">Login</label>
                                            <Field
                                                className="loginPage__input"
                                                id="login"
                                                name="login"
                                                validate={value => Boolean(value)}
                                            />
                                        </div>
                                        <div className="loginPage__inputWrap">
                                            <label className="loginPage__label" htmlFor="senha">Senha</label>
                                            <Field
                                                id="senha"
                                                name="senha"
                                                render={(field) => 
                                                    <input {...field} className="loginPage__input" type="password" />
                                                }
                                            />
                                        </div>
                                        {/* <div className="loginPage__errorBox">
                                    { this.state.errorMessage }
                                </div> */}
                                        <div className="loginPage__inputWrap">
                                            <button className="loginPage__btnLogin" type="submit">
                                                Logar
                                    </button>
                                        </div>
                                    </Form>
                                )}
                            ></Formik>
                        </Widget>
                    </div>
                </div>
            </Fragment>
        )
    }
}


export default LoginPage