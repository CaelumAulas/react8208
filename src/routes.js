import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable';
// import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage'; // Converte pra um Async com Loadable

import Profile from './pages/Profile';

const HomePageAsync = Loadable({
    loader: () => import('./pages/HomePage'),
    loading: () => (<div>Cargando...</div>),
  });
  
  

// class PrivateRoute extends Component {
const PrivateRoute = (props) => { // Dumb/Presentational Components
    const Component = props.component
    if(!localStorage.getItem('TOKEN')) {
        return <Redirect to="/login" />
    } else {
        return ( <Component /> )
    }
}
// }

const Pager404 = () => {
    return <div>Você falhou na vida</div>
}


const LogoutPage = (props) => {
    localStorage.removeItem('TOKEN')
    props.history.push('/login')

    return (
        <div>Logout...</div>
    )
}

export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <PrivateRoute path="/" exact={true} component={HomePageAsync} />
                <Route path="/profile" component={Profile} />
                <Route path="/login" component={LoginPage} />
                <Route path="/logout" component={LogoutPage} />
                <Route component={Pager404} />
            </Switch>
        )
    }
}

// Rota 404 - OK 
// Lazy loading de rotas
