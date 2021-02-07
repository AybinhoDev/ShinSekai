import React from 'react'
import {Route,
    BrowserRouter as Router,
    Redirect,
    Switch } from 'react-router-dom'
import Login from '../screens/login'
import Home from '../screens/home'
import Library from '../screens/library'
import PrivateRoute from '../tools/privateRoute'
import Header from '../components/header';
import Footer from '../components/footer'
import Detail from '../components/detail'

const Routes = () => {
    return(
        <Router>
            <Header></Header>
            <Switch>
                <Route exact path='/' component={Login}></Route>
                <Route path='/home' component={Home}></Route>
                <Route path='/detail/:name' component={Detail}></Route>
                <PrivateRoute path='/library' component={Library}></PrivateRoute>
                <Redirect to='/home'></Redirect>
            </Switch>
            <Footer></Footer>
        </Router>
    )
}
export default Routes