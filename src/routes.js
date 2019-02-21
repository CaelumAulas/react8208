import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

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


export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <PrivateRoute path="/" exact={true} component={HomePage} />
                <Route path="/login" component={LoginPage} />
            </Switch>
        )
    }
}

// Rota 404
// Lazy loading de rotas
