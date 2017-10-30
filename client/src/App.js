import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Clientes from './routes/Clientes';
import Negocios from './routes/Negocios';
import Tareas from './routes/Tareas';
import Llamadas from './routes/Llamadas';
import Ayuda from './routes/Ayuda';
import Home from './routes/Home';
import Login from './routes/Login';

class App extends Component {
    state = {
        route: "Home"
    };

    componentWillMount(){
        if (window.location.href === "http://localhost:3000/") {
            console.log('Ruta: Home')
        } else {
            console.log(window.location.href)
        }
    }

    render() {
        return (
            <Router>
                <div className="home">
                    <Route exact path="/" component={Login} />
                    <Route path="/home/:user?" component={Home} user="" staticContext="algo" />
                    <Route path="/clientes" component={Clientes} user="" staticContext="algo"/>
                    <Route path="/negocios" component={Negocios} />
                    <Route path="/llamadas" component={Llamadas} />
                    <Route path="/tareas" component={Tareas} />
                    <Route path="/ayuda" component={Ayuda} />
                    <Route path="/login" component={Login} />
                </div>
            </Router>
        );
    }
}

export default App;
