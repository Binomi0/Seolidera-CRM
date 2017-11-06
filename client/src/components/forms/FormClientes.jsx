import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit,
        marginLeft: theme.spacing.unit
    }),
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
            sendDisabled: false,
            dialogOpen: false
        }
    }

    componentWillMount() {
        if (!this.props.cliente) {
            return null
        } else if (this.props.action) {
            this.setState({ ...this.props.cliente })
        }
    }

    handleChange(evt, item) {
        if (item === 'nombre' && evt.target.value.length === 3) {
            this.setState({ [item]: evt.target.value, buser: 'seo' + evt.target.value + Math.floor(Math.random() * (99 - 10)) + 10 + '@gmail.com',})
        } else {
            this.setState({ [item]: evt.target.value})
        }
    }

    confirmForm() {
        this.setState({ dialogOpen: true });
    }

    handleRequestClose(accepted) {
        if (!accepted) {
            this.setState({ dialogOpen: accepted })
        } else {
            this.setState({ dialogOpen: false , sendDisabled: true })
            this.sendForm()
        }
    }

    sendForm() {
        let datos = this.state;
        let { nuevoCliente, editarCliente, action } = this.props;
        fetch('/api/clientes/nuevo', {
            method: action === 'editar' ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(datos)
        })
            .then(res => res.json())
            .then(result => {
                action === 'editar'
                ? editarCliente(result)
                : nuevoCliente(result)
            })
    }

    render() {
        const { classes, action } = this.props;
        // console.log(this.state);
        // console.log('ACCION',action);
        return (
            <div>

                <Dialog open={this.state.dialogOpen} onRequestClose={this.handleRequestClose.bind(this, false)}>
                    <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Estas a punto de modificar la base de datos, confirma por favor.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleRequestClose.bind(this, false)} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={this.handleRequestClose.bind(this, true)} color="primary" autoFocus>
                            Aceptar
                        </Button>
                    </DialogActions>
                </Dialog>
                <form className={classes.container} noValidate autoComplete="off">
                    <Paper className={classes.root} elevation={4}>
                        <Typography type="display1" gutterBottom>
                            { action === 'editar' ? 'Editando cliente' : 'Añadir nuevo cliente'}
                        </Typography>
                        <TextField
                            id="nombre"
                            label="Nombre"
                            className={classes.textField}
                            value={this.state.nombre}
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
                    </Paper>
                </form>
                <Button raised color="primary" className={classes.button} onClick={this.confirmForm.bind(this)} disabled={this.state.sendDisabled}>
                    { action === 'editar' ? 'Editar cliente' : 'Añadir nuevo cliente'}
                </Button>
            </div>
        )
    }
}

Formulario.PropTypes = {
    nuevoCliente: PropTypes.func.isRequired,
    editarCliente: PropTypes.func.isRequired,

};


export default withStyles(styles)(Formulario);