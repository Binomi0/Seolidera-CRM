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
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';

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
    textArea: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 320,
    }
});

class FormLlamadas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            producto: '',
            tlf: '',
            agente: '',
            objetivo: '',
            asunto: '',
            fecha: '',
            descripcion: '',
            tipo: '',
            cuenta: '',
            estado: '',
            sendDisabled: false,
            dialogOpen: false
        }
    }

    componentWillMount() {
        if (!this.props.cliente.llamadas) {
            return null
        } else if (this.props.action) {
            this.setState({ ...this.props.cliente.llamadas })
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
            this.setState({ dialogOpen: false , sendDisabled: true });
            this.sendForm()
        }
    }

    sendForm() {
        console.log(this.props);
        let { action } = this.props;
        let datos = this.state;
        datos['cliente'] = this.props.cliente._id;
        fetch('/api/llamadas/nuevo', {
            method: action === 'editar' ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(datos)
        })
            .then(res => res.json())
            .then(result => {
                action === 'editar'
                ? this.props.editarLlamada(result)
                : this.props.nuevaLlamada(result)
            })
    }

    render() {
        const { classes, action } = this.props;
        // console.log(this.state);
        // console.log('ACCION',action);
        return (
            <Paper className={classes.root} elevation={4}>
                <Typography type="display1" gutterBottom>
                    { action === 'editar' ? 'Editando Llamada' : 'Añadir nueva llamada'}
                </Typography>
                <Dialog open={this.state.dialogOpen} onRequestClose={this.handleRequestClose.bind(this, false)}>
                    <DialogTitle>{"Confirmación de seguridad"}</DialogTitle>
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
                        <Typography type="title" gutterBottom>
                            Detalles de la llamada
                        </Typography>
                        <TextField
                            id="producto"
                            label="Producto"
                            className={classes.textField}
                            value={this.state.producto}
                            onChange={(e) => this.handleChange(e, 'producto')}
                            margin="normal"
                            autoFocus={true}
                        />
                        <TextField
                            id="tlf"
                            label="Teléfono"
                            className={classes.textField}
                            value={this.state.tlf}
                            onChange={(e) => this.handleChange(e, 'tlf')}
                            margin="normal"
                        />
                        <TextField
                            id="agente"
                            label="Agente"
                            className={classes.textField}
                            value={this.state.agente}
                            onChange={(e) => this.handleChange(e, 'agente')}
                            margin="normal"
                        />
                        <TextField
                            id="objetivo"
                            label="Objetivo"
                            className={classes.textField}
                            value={this.state.objetivo}
                            onChange={(e) => this.handleChange(e, 'objetivo')}
                            margin="normal"
                        />
                        <TextField
                            id="asunto"
                            label="Asunto"
                            className={classes.textField}
                            value={this.state.asunto}
                            onChange={(e) => this.handleChange(e, 'asunto')}
                            margin="normal"
                        />
                        <TextField
                            id="tipo"
                            label="Tipo"
                            className={classes.textField}
                            value={this.state.tipo}
                            onChange={(e) => this.handleChange(e, 'tipo')}
                            margin="normal"
                        />
                        <TextField
                            id="cuenta"
                            label="Cuenta"
                            className={classes.textField}
                            value={this.state.cuenta}
                            onChange={(e) => this.handleChange(e, 'cuenta')}
                            margin="normal"
                        />
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="estado">Estado</InputLabel>
                            <Select
                                value={this.state.estado}
                                onChange={(e) => this.handleChange(e, 'estado')}
                                input={<Input id="estado" />}
                            >
                                <MenuItem value={0}>Pendiente</MenuItem>
                                <MenuItem value={1}>En tránsito</MenuItem>
                                <MenuItem value={2}>Completada</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            id="descripcion"
                            label="Descripcion"
                            multiline={true}
                            className={classes.textArea}
                            value={this.state.descripcion}
                            onChange={(e) => this.handleChange(e, 'descripcion')}
                            margin="normal"
                        />
                    </Paper>
                </form>
                <Button raised color="primary" className={classes.button} onClick={this.confirmForm.bind(this)} disabled={this.state.sendDisabled}>
                    { action === 'editar' ? 'Editar Llamada' : 'Añadir nueva llamada'}
                </Button>
            </Paper>
        )
    }
}

FormLlamadas.PropTypes = {
    classes: PropTypes.object.isRequired,
    nuevaLlamada: PropTypes.func.isRequired,
    editarLlamada: PropTypes.func.isRequired
};


export default withStyles(styles)(FormLlamadas);