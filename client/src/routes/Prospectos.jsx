import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
});

class Prospectos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            email: ''
        };
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    enviarMail() {
        let url = '/clientes/nuevo-prospecto';
        let headers = { 'Content-Type': 'application/json; charset=UTF-8' };
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(this.state)
        })
        .then(() => {
            console.log('Email enviado')
        })
    }

    render() {
        let { classes } = this.props;
        return (
            <div>
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        id="nombre"
                        label="Nombre"
                        className={classes.textField}
                        value={this.state.nombre}
                        onChange={this.handleChange('nombre')}
                        margin="normal"
                    />
                    <TextField
                        id="email"
                        label="Correo Electrónico"
                        className={classes.textField}
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        margin="normal"
                    />
                    <Button
                        raised
                        color="accent"
                        className={classes.button}
                        onClick={this.enviarMail.bind(this)}
                    >
                        Enviar
                    </Button>
                </form>
            </div>
        )
    }
}

Prospectos.PropTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Prospectos);