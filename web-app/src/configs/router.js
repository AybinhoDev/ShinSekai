import React from 'react'
import {Route,
    BrowserRouter as Router,
    Redirect,
    Switch } from 'react-router-dom'
import Login from '../screens/login'
import Home from '../screens/home'
import Library from '../screens/library'
import PrivateRoute from '../tools/privateRoute'

const Routes = () => {
    return(
        <Router>
            <Switch>
                <Route exact path='/' component={Login}></Route>
                <Route path='/home' component={Home}></Route>
                <PrivateRoute path='/library' component={Library}></PrivateRoute>
                <Redirect to='/'></Redirect>
            </Switch>
        </Router>
    )
}
export default Routes