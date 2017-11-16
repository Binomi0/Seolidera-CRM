import React from 'react'
import PropTypes from  'prop-types';
import { connect } from 'react-redux';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            pasw: '',
        };
    }

    login = () => {
        let accesos = { admin: '12345', adolfo: '12345', lidia: '12345', juliana: '12345' };
        let { name, pasw } = this.state;
        if (accesos[name].toLowerCase() === pasw) {
            this.props.setUser(name)
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

Login.PropTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        user: state.users,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => {
            dispatch({
                type: 'SET_USER',
                payload: user
            })
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

