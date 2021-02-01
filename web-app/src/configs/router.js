import React from 'react'
import {Route,
    BrowserRouter as Router,
    Redirect,
    Switch } from 'react-router-dom'
import Login from '../screens/login'
import Home from '../screens/home'
import Library from '../screens/library'
import Search from '../screens/search'
import PrivateRoute from '../tools/privateRoute'
import Header from '../components/header';
import Footer from '../components/footer'

const Routes = () => {
    return(
        <Router>
            <Header></Header>
            <Switch>
                <Route exact path='/' component={Login}></Route>
                <Route path='/home' component={Home}></Route>
                <PrivateRoute path='/library' component={Library}></PrivateRoute>
                <PrivateRoute path='/search' component={Search}/>
                <Redirect to='/home'></Redirect>
            </Switch>
            <Footer></Footer>
        </Router>
    )
}
export default Routes