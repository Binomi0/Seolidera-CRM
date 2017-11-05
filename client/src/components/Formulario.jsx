import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    container: {
        display: 'flex',
            flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            width: 200,
    },
});

class Formulario extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            apellidos: '',
            fiscal: '',
            dni: '',
            email: '',
            telf: '',
            direccion: '',
            direccion2: '',
            poblacion: '',
            provincia: '',
            postal: '',
            fuente: '',
            observaciones: '',
            tipo: 'cliente',
            buser: '',
            bpasw: Math.random().toString(36).slice(-8),
            sendDisabled: false
        }
    }

    handleChange(evt, item) {
        if (item === 'nombre' && evt.target.value.length === 3) {
            console.log(evt.target.value);
            this.setState({ [item]: evt.target.value, buser: 'seo' + evt.target.value + Math.floor(Math.random() * (99 - 10)) + 10 + '@gmail.com',})
        } else {
            this.setState({ [item]: evt.target.value})
        }
    }

    sendForm() {
        let datos = this.state;
        let { formularioEnviado } = this.props;
        fetch('/api/clientes/nuevo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(datos)
        })
            .then(res => res.json())
            .then(result => {
                formularioEnviado(result)
            })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Typography type="display1" gutterBottom>
                    Añadir nuevo cliente
                </Typography>
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        id="nombre"
                        label="Nombre"
                        className={classes.textField}
                        value={this.state.name}
                        onChange={(e) => this.handleChange(e, 'nombre')}
                        margin="normal"
                        autoFocus={true}
                    />
                    <TextField
                        id="apellidos"
                        label="apellidos"
                        className={classes.textField}
                        value={this.state.apellidos}
                        onChange={(e) => this.handleChange(e, 'apellidos')}
                        margin="normal"
                    />
                    <TextField
                        id="fiscal"
                        label="fiscal"
                        className={classes.textField}
                        value={this.state.fiscal}
                        onChange={(e) => this.handleChange(e, 'fiscal')}
                        margin="normal"
                    />
                    <TextField
                        id="dni"
                        label="dni"
                        className={classes.textField}
                        value={this.state.dni}
                        onChange={(e) => this.handleChange(e, 'dni')}
                        margin="normal"
                    />
                    <TextField
                        id="email"
                        label="email"
                        className={classes.textField}
                        value={this.state.email}
                        onChange={(e) => this.handleChange(e, 'email')}
                        margin="normal"
                    />
                    <TextField
                        id="telf"
                        label="telf"
                        className={classes.textField}
                        value={this.state.telf}
                        onChange={(e) => this.handleChange(e, 'telf')}
                        margin="normal"
                    />
                    <TextField
                        id="direccion"
                        label="direccion"
                        className={classes.textField}
                        value={this.state.direccion}
                        onChange={(e) => this.handleChange(e, 'direccion')}
                        margin="normal"
                    />
                    <TextField
                        id="direccion2"
                        label="direccion2"
                        className={classes.textField}
                        value={this.state.direccion2}
                        onChange={(e) => this.handleChange(e, 'direccion2')}
                        margin="normal"
                    />
                    <TextField
                        id="poblacion"
                        label="poblacion"
                        className={classes.textField}
                        value={this.state.poblacion}
                        onChange={(e) => this.handleChange(e, 'poblacion')}
                        margin="normal"
                    />
                    <TextField
                        id="provincia"
                        label="provincia"
                        className={classes.textField}
                        value={this.state.provincia}
                        onChange={(e) => this.handleChange(e, 'provincia')}
                        margin="normal"
                    />
                    <TextField
                        id="postal"
                        label="postal"
                        className={classes.textField}
                        value={this.state.postal}
                        onChange={(e) => this.handleChange(e, 'postal')}
                        margin="normal"
                    />
                    <TextField
                        id="fuente"
                        label="fuente"
                        className={classes.textField}
                        value={this.state.fuente}
                        onChange={(e) => this.handleChange(e, 'fuente')}
                        margin="normal"
                    />
                    <TextField
                        id="observaciones"
                        label="observaciones"
                        className={classes.textField}
                        value={this.state.observaciones}
                        onChange={(e) => this.handleChange(e, 'observaciones')}
                        margin="normal"
                    />
                    <Button raised color="primary" className={classes.button} onClick={this.sendForm.bind(this)} disabled={this.state.sendDisabled}>
                        Añadir Cliente
                    </Button>
                </form>
            </div>
        )
    }
}

Formulario.PropTypes = {
    formularioEnviado: PropTypes.func.isRequired,

};


export default withStyles(styles)(Formulario);