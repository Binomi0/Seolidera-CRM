import React from 'react'
import { Redirect } from 'react-router-dom'


export default class Login extends React.Component {
    state = {
        redirectToReferrer: false,
        name: '',
        pasw: '',
    };

    login = () => {
        let accesos = {
            name: 'adolfo',
            pasw: 'ar12003'
        };
        let { name, pasw } = this.state;

        if (accesos.name === name && accesos.pasw === pasw) {
            console.log('Acceso concedido');
            this.setState({ redirectToReferrer: true })
        } else {
            console.log('Acceso denegado')
        }

    };

    updateName(e) {
        this.setState({ name: e.target.value })
    }

    updatePasw(e) {
        this.setState({ pasw: e.target.value })
    }


    render () {
        console.log(this.props.location.state);
        const { from } = this.props.location.state || { from: { pathname: `/home/${this.state.name}` } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return (
                <Redirect to={from}/>
            )
        }

        return (
            <div className="login-page">
                <div className="login-form">
                        <input type="text" onChange={(e) => this.updateName(e)} placeholder="Usuario"/>
                        <input type="password" onChange={(e) => this.updatePasw(e)} placeholder="Contraseña"/>
                        <button onClick={this.login}>Acceder</button>
                </div>
            </div>
        )
    }
}