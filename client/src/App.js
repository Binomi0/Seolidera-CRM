import React, { Component } from 'react';
import './App.css';
import Login from './routes/Login';
import Header from './components/Header';
import Home from './routes/Home';
import 'typeface-roboto';
import { connect } from 'react-redux'
// import Clientes from './routes/Clientes';
// import Negocios from './routes/Negocios';
// import Tareas from './routes/Tareas';
// import Llamadas from './routes/Llamadas';
// import Ayuda from './routes/Ayuda';
// import Home from './routes/Home';

class App extends Component {
    state = {
        version: 'v.0.2',
    };

    componentWillMount(){
        let user = sessionStorage.getItem('user');
        if (user) {
            this.props.setUser(user);
        }
    }

    autenticacionUsuario(user) {
        sessionStorage.setItem('user', user);
        this.props.setUser(user);
    }


    logOut = () => {
        console.log('Saliendo');
        sessionStorage.removeItem('user');
        this.props.setUser('');
        this.props.setRoute('Home');
    };

    handleRoute = route => {
        console.log('Cambiando ruta', route);
        this.props.setRoute(route);
    };

    render() {
        console.log(this.props);
        return (
            <div className="home">
                <Header
                    user={this.props.user.nombre}
                    title={this.props.route.name}
                    subtitle={this.state.version}
                    route={this.props.route.name}
                    handleRoute={this.handleRoute.bind(this)}
                    logOut={() => this.logOut()}
                />
                <Home user={this.props.user.nombre} route={this.props.route.name} />
                { this.props.user.nombre ? '' : <Login  /> }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        route: state.routes,
        user: state.users
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setRoute: (route) => {
            dispatch({
                type: 'SET_ROUTE',
                payload: route
            })
        },
        setUser: (user) => {
            dispatch({
                type: 'SET_USER',
                payload: user
            })
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
