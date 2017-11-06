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
        // margin: theme.spacing.unit,
        minWidth: 200,
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

class FormTareas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titulo: '',
            fecha_inicio: '',
            fecha_fin: '',
            agente: '',
            estado: '',
            descripcion: '',
            responsable: '',
            sendDisabled: false,
            dialogOpen: false
        }
    }

    componentWillMount() {
        if (!this.props.cliente.tareas) {
            return null
        } else if (this.props.action) {
            this.setState({ ...this.props.cliente.tareas })
        }
    }

    handleChange(evt, item) {
        console.log(item);
        this.setState({ [item]: evt.target.value})
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
        let { action, user } = this.props;
        let datos = this.state;
        datos['cliente'] = this.props.cliente._id;
        fetch('/api/tareas/nuevo', {
            method: action === 'editar' ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(datos)
        })
            .then(res => res.json())
            .then(result => {
                action === 'editar'
                ? this.props.editarTarea(result)
                : this.props.nuevaTarea(result)
            })
    }

    render() {
        const { classes, action } = this.props;
        // let hoy = new Date.now();
        // hoy = hoy.toLocaleDateString();
        // console.log(this.state);
        // console.log('ACCION',action);
        return (
            <Paper className={classes.root} elevation={4}>
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
                            Detalles de la Tarea
                        </Typography>
                        <TextField
                            id="titulo"
                            label="Titulo"
                            className={classes.textField}
                            value={this.state.titulo}
                            onChange={(e) => this.handleChange(e, 'titulo')}
                            margin="normal"
                            autoFocus={true}
                        />
                        <TextField
                            id="fecha_inicio"
                            label="Fecha de Inicio"
                            type="date"
                            className={classes.textField}
                            value={this.state.fecha_inicio}
                            onChange={(e) => this.handleChange(e, 'fecha_inicio')}
                            // margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="fecha_fin"
                            label="Fecha de Fin"
                            type="date"
                            className={classes.textField}
                            value={this.state.fecha_fin || ''}
                            onChange={(e) => this.handleChange(e, 'fecha_fin')}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
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
                            id="responsable"
                            label="responsable"
                            multiline={true}
                            className={classes.textField}
                            value={this.state.responsable}
                            onChange={(e) => this.handleChange(e, 'responsable')}
                            margin="normal"
                        />
                        <TextField
                            id="descripcion"
                            label="descripcion"
                            multiline={true}
                            className={classes.textField}
                            value={this.state.descripcion}
                            onChange={(e) => this.handleChange(e, 'descripcion')}
                            margin="normal"
                        />
                    </Paper>
                </form>
                <Button raised color="primary" className={classes.button} onClick={this.confirmForm.bind(this)} disabled={this.state.sendDisabled}>
                    { action === 'editar' ? 'Editar Tarea' : 'Añadir nueva tarea'}
                </Button>
            </Paper>
        )
    }
}

FormTareas.PropTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.string.isRequired,
    nuevaTarea: PropTypes.func.isRequired,
    editarTarea: PropTypes.func.isRequired
};


export default withStyles(styles)(FormTareas);