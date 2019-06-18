import React, { Component } from "react";
import { Switch, Route, Redirect, } from "react-router-dom";
import { AsyncComponent } from './Utils';

const AsyncHomeContainer = AsyncComponent(() => import('./modules/home/container/Home'));
const AsyncSignInContainer = AsyncComponent(() => import('./modules/auth/container/SignInContainer'));
const AsyncRegisterContainer = AsyncComponent(() => import('./modules/auth/container/SignUpContainer'));

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        rest.isAuthenticated ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/signin',
                state: { from: props.location }
            }}/>
        )
    )}/>
)

class MainRoutes extends Component{

    render(){
        const { isAuthenticated } = this.props
        return (
            <Switch>
                <PrivateRoute key="home" exact={ !isAuthenticated } isAuthenticated={isAuthenticated} path="/" component={ AsyncHomeContainer }/>,
                <Route key="signin" path="/signin" component={ AsyncSignInContainer }/>
                <Route key="register" path="/register" component={ AsyncRegisterContainer }/>
                <Route component={ () => <div>404 Page</div> } />
            </Switch>
        )
    }
}

export default MainRoutes;