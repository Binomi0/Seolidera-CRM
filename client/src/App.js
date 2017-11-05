import React, { Component } from 'react';
import './App.css';
// import Clientes from './routes/Clientes';
// import Negocios from './routes/Negocios';
// import Tareas from './routes/Tareas';
// import Llamadas from './routes/Llamadas';
// import Ayuda from './routes/Ayuda';
// import Home from './routes/Home';
import Login from './routes/Login';
import Header from './components/Header'
import Clientes from "./routes/Clientes";
import 'typeface-roboto';

class App extends Component {
    state = {
        route: "Home",
        user: ''
    };

    componentWillMount(){
        let user = sessionStorage.getItem('user');
        if (user) this.setState({ user });
    }

    autenticacionUsuario(user) {
        sessionStorage.setItem('user', user);
        this.setState({ user })
    }

    loggedIn = () => <Clientes />;

    logout = () => {
        sessionStorage.removeItem('user');
        this.setState({ user: null })
    };

    notLogged = () => <Login autenticacionUsuario={this.autenticacionUsuario.bind(this)} />;

    changeRoute = (route) => {
        // console.log('RUTA', route);
        this.setState({ route })
    };

    render() {
        return (
            <div className="home">
                <Header
                    user={this.state.user}
                    title={this.state.route}
                    route={this.state.route}
                    changeRoute={this.changeRoute.bind(this)}
                    logout={() => this.logout()}
                />
                { this.state.user ? this.loggedIn() : this.notLogged() }
            </div>
        );
    }
}

export default App;
