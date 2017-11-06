/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
// import List, { ListItem, ListItemText } from 'material-ui/List';
// import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';
import FormNegocios from '../forms/FormNegocios';
import FormLlamadas from '../forms/FormLlamadas';
import FormClientes from '../forms/FormClientes';
import FormTareas from '../forms/FormTareas';


const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
    state = {
        open: true,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
        this.props.closed()
    };

    render() {
        const { classes, cliente, user, type, nuevoCliente, nuevoNegocio, nuevaLlamada, nuevaTarea, closed } = this.props;
        return (
            <div>

                {/*<Button onClick={this.handleClickOpen}>Open full-screen dialog</Button>*/}
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                    transition={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="contrast" onClick={this.handleRequestClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography type="title" color="inherit" className={classes.flex}>
                                Añadir {this.props.type}
                            </Typography>
                            <Button color="contrast" onClick={nuevoNegocio}>
                                Guardar
                            </Button>
                        </Toolbar>
                    </AppBar>
                    {
                        type === 'Negocio'
                            ? <FormNegocios
                                nuevoNegocio={nuevoNegocio}
                                cliente={cliente}
                                action="nuevo"
                                user={user}
                            />
                            : ''
                    }

                    {
                        type === 'Llamada'
                            ? <FormLlamadas
                                nuevaLlamada={nuevaLlamada}
                                cliente={cliente}
                                action="nuevo"
                                user={user}
                            />
                            : ''
                    }

                    {
                        type === 'Tarea'
                            ? <FormTareas
                                nuevaTarea={nuevaTarea}
                                cliente={cliente}
                                action={this.props.action}
                                user={user}
                            />
                            : ''
                    }

                    {
                        type === 'Cliente'
                            ? <FormClientes
                                nuevoCliente={nuevoCliente}
                                cliente={cliente}
                                action="nuevo"
                                user={user}
                            />
                            : ''
                    }


                </Dialog>
            </div>
        );
    }
}

FullScreenDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    cliente: PropTypes.object.isRequired,
    user: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    closed: PropTypes.func.isRequired,
    // nuevoNegocio: PropTypes.func.isRequired,
    // nuevaTarea: PropTypes.func.isRequired,
    // nuevaLlamada: PropTypes.func.isRequired,
};

export default withStyles(styles)(FullScreenDialog);