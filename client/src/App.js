import React, { Component } from 'react';
import './App.css';
import Login from './routes/Login';
import Header from './components/Header';
import Home from './routes/Home';
import 'typeface-roboto';
// import Clientes from './routes/Clientes';
// import Negocios from './routes/Negocios';
// import Tareas from './routes/Tareas';
// import Llamadas from './routes/Llamadas';
// import Ayuda from './routes/Ayuda';
// import Home from './routes/Home';

class App extends Component {
    state = {
        route: "Home",
        user: '',
        version: 'v.0.1'
    };

    componentWillMount(){
        let user = sessionStorage.getItem('user');
        if (user) this.setState({ user });
    }

    autenticacionUsuario(user) {
        sessionStorage.setItem('user', user);
        this.setState({ user })
    }

    loggedIn = () => <Home user={this.state.user} />;

    logout = () => {
        sessionStorage.removeItem('user');
        this.setState({ user: null })
    };

    notLogged = () => <Login autenticacionUsuario={this.autenticacionUsuario.bind(this)} />;

    changeRoute = (route) => {
        this.setState({ route })
    };

    render() {
        return (
            <div className="home">
                <Header
                    user={this.state.user}
                    title={this.state.route}
                    subtitle={this.state.version}
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
