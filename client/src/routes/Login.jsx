import React from 'react'


export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            pasw: '',
        };
    }

    login = () => {
        let accesos = {
            name: 'admin',
            pasw: '12345'
        };
        let { name, pasw } = this.state;

        if (accesos.name === name && accesos.pasw === pasw) {
            // console.log('Acceso concedido');
            this.props.autenticacionUsuario(name)
        } else {
            alert('Acceso denegado')
        }
    };

    render () {

        return (
            <div className="login-page">
                <div className="login-form">
                    <h1>Formulario de Acceso</h1>
                    <input type="text" onChange={(e) => this.setState({ name: e.target.value })} placeholder="Usuario"/>
                    <br/>
                    <input type="password" onChange={(e) => this.setState({ pasw: e.target.value })} placeholder="Contraseña"/>
                    <br/>
                    <button onClick={this.login.bind(this)}>Acceder</button>
                </div>
            </div>
        )
    }
}