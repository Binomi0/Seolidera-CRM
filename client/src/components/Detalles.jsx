/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Badge from 'material-ui/Badge';
import red from 'material-ui/colors/red';
import Tooltip from 'material-ui/Tooltip';
import AddIcon from 'material-ui-icons/Add'
import Phone from 'material-ui-icons/Phone';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Business from 'material-ui-icons/Business';
import Work from 'material-ui-icons/Work';

const styles = theme => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        margin: theme.spacing.unit,
        float: 'right'
    },
    badge: {
        margin: `0 ${theme.spacing.unit * 2}px`,
    },
    card: {
        minWidth: 360,
        maxWidth: 480,
    },
    media: {
        height: 194,
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    flexGrow: {
        flex: '1 1 auto',
    },
});

class RecipeReviewCard extends React.Component {
    state = { expanded: false, callsExpanded: false, negociosExpanded: false, tareasExpanded: false };

    handleExpandClick = (item) => {
        this.setState({ [item]: !this.state[item] });
    };

    render() {
        let options = { weekday: 'long', day: 'numeric', year: 'numeric', month: 'long', };
        let badgeColor = ['primary', 'accent'];
        let recurrencia = { 1: 'Mensual', 3: 'Trimestral', 6: 'Semestral', 12: 'Anual' };
        const { classes, cliente } = this.props;

        return (
            <div className={classes.container}>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Tooltip title="Estado" placement="bottom" enterDelay={300}>
                                <Avatar aria-label="Recipe" className={classes.avatar}>
                                    R
                                </Avatar>
                            </Tooltip>
                        }
                        title={`${cliente.nombre} ${cliente.apellidos} `}
                        subheader={`Alta: ` + new Date(cliente.alta).toLocaleDateString('es-ES', options)}
                    />
                    <CardContent>

                    </CardContent>
                    <CardActions disableActionSpacing>
                        <Tooltip title="Ver Negocios" placement="top-start" enterDelay={300}>
                            <IconButton
                                aria-label="Negocios"
                                className={classnames(classes.expand, {
                                    [classes.expandOpen]: this.state.negociosExpanded,
                                })}
                                onClick={() => this.handleExpandClick('negociosExpanded')}
                                aria-expanded={this.state.negociosExpanded}
                            >
                                <Badge className={classes.badge} badgeContent={cliente.negocios.length} color={cliente.negocios.length < 1 ? badgeColor[0] : badgeColor[1]} >
                                    <Business />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Ver Llamadas" placement="top" enterDelay={300}>
                            <IconButton
                                className={classnames(classes.expand, {
                                    [classes.expandOpen]: this.state.callsExpanded,
                                })}
                                onClick={() => this.handleExpandClick('callsExpanded')}
                                aria-expanded={this.state.callsExpanded}
                                aria-label="Llamadas"

                            >
                                <Badge className={classes.badge} badgeContent={cliente.llamadas.length} color={cliente.llamadas.length < 1 ? badgeColor[0] : badgeColor[1]} >
                                    <Phone />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Ver Tareas" placement="top-end" enterDelay={300}>
                            <IconButton
                                aria-label="Tareas"
                                className={classnames(classes.expand, {
                                    [classes.expandOpen]: this.state.tareasExpanded,
                                })}
                                onClick={() => this.handleExpandClick('tareasExpanded')}
                                aria-expanded={this.state.tareasExpanded}
                            >
                                <Badge className={classes.badge} badgeContent={cliente.tareas.length} color={cliente.tareas.length < 1 ? badgeColor[0] : badgeColor[1]} >
                                    <Work />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <div className={classes.flexGrow} />
                        <Tooltip title="Ver Detalles" placement="top" enterDelay={300}>
                            <IconButton
                                className={classnames(classes.expand, {
                                    [classes.expandOpen]: this.state.expanded,
                                })}
                                onClick={() => this.handleExpandClick('expanded')}
                                aria-expanded={this.state.expanded}
                                aria-label="Show more"
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        </Tooltip>
                    </CardActions>
                    <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph type="body2">
                                ID: {cliente._id} <br/>
                                Nombre Fiscal: {cliente.fiscal}<br/>
                                Teléfono: {cliente.telf}<br/>
                                Email: {cliente.email}<br/>
                                NIF/CIF: {cliente.dni}<br/>
                                <li><strong>Fecha de Alta: </strong>{new Date(cliente.alta).toLocaleDateString('es-ES', options)} </li>
                                <li><strong>Nombre: </strong>{cliente.nombre} </li>
                                <li><strong>Apellidos: </strong>{cliente.apellidos} </li>
                                <li><strong>Nombre Fiscal: </strong>{cliente.fiscal} </li>
                                <li><strong>Teléfono: </strong>{cliente.telf} </li>
                                <li><strong>Email: </strong>{cliente.email} </li>
                                <li><strong>Dirección: </strong>{cliente.direccion} </li>
                                <li><strong>Provincia: </strong>{cliente.provincia} </li>
                                <li><strong>Código Postal: </strong>{cliente.postal} </li>
                                <li><strong>Proxima Renovación </strong>{cliente.renovar ? cliente.renovar : 'Falta Fecha de renovacion'} </li>
                                <li><strong>DNI: </strong>{cliente.dni} </li>
                                <li><strong>Observaciones: </strong>{cliente.observaciones} </li>
                                <li><strong>Usuario Business: </strong>{cliente.buser} </li>
                                <li><strong>Pasw Business: </strong>{cliente.bpasw} </li>
                            </Typography>
                        </CardContent>
                    </Collapse>
                    <Collapse in={this.state.negociosExpanded} transitionDuration="auto" unmountOnExit>
                        <CardContent>
                            <Typography type="headline" component="h2">
                                Lista de Negocios
                            </Typography>
                            <Tooltip title="Nuevo Negocio" placement="left" enterDelay={300}>
                                <Button
                                    href={`/api/crearNegocio`}
                                    // onClick={(e) => addAction(true)}
                                    fab={true}
                                    color="primary"
                                    aria-label="nuevo negocio"
                                    className={classes.button}
                                >
                                    <AddIcon />
                                </Button>
                            </Tooltip>
                                {
                                    cliente.negocios.length > 0
                                        ? cliente.negocios.map((negocio, index) => {
                                        return (
                                            <CardContent key={index}>

                                                <Typography type="title" gutterBottom>
                                                    {negocio.nombre}
                                                </Typography>

                                                <Typography gutterBottom noWrap>
                                                    Renovación: {negocio.renovar}
                                                    </Typography>
                                                <Typography gutterBottom noWrap>
                                                    Recurrencia: {recurrencia[negocio.renovacion]}
                                                </Typography>
                                            </CardContent>
                                        )
                                    })
                                        : ''
                                }
                        </CardContent>
                    </Collapse>
                    <Collapse in={this.state.callsExpanded} transitionDuration="auto" unmountOnExit>
                        <CardContent>
                            <Typography type="headline" component="h2">
                                Lista de Llamadas
                            </Typography>
                            <Tooltip title="Nueva Llamada" placement="left" enterDelay={300}>
                                <Button
                                    href={`/api/crearLlamada`}
                                    // onClick={(e) => addAction(true)}
                                    fab={true}
                                    color="primary"
                                    aria-label="nueva llamada"
                                    className={classes.button}
                                >
                                    <AddIcon />
                                </Button>
                            </Tooltip>
                            {
                                cliente.llamadas.length > 0
                                    ? cliente.llamadas.map((llamada, index) => {
                                    return (
                                        <CardContent key={index}>

                                        <Typography type="title" gutterBottom>
                                            {llamada.agente}
                                        </Typography>
                                        <Typography gutterBottom>
                                            Estado: {llamada.estado}
                                        </Typography>
                                        <Typography gutterBottom noWrap>
                                            Detalles: {llamada.descripcion}
                                        </Typography>
                                    </CardContent>
                                    )
                                })
                                    : ''
                            }
                        </CardContent>
                    </Collapse>
                    <Collapse in={this.state.tareasExpanded} transitionDuration="auto" unmountOnExit>
                        <CardContent>
                            <Typography type="headline" component="h2">
                                Lista de Tareas
                            </Typography>
                            <Tooltip title="Nueva Tarea" placement="left" enterDelay={300}>
                                <Button
                                    href={`/api/crearTarea`}
                                    // onClick={(e) => addAction(true)}
                                    fab={true}
                                    color="primary"
                                    aria-label="nueva tarea"
                                    className={classes.button}
                                    dense={true}
                                >
                                    <AddIcon />
                                </Button>
                            </Tooltip>
                                {
                                    cliente.tareas.length > 0
                                        ? cliente.tareas.map((tarea, index) => {
                                        return <CardContent key={index}>

                                            <Typography type="caption" gutterBottom align="center">
                                                {new Date(tarea.fecha_inicio).toLocaleDateString('es-ES', options)}
                                            </Typography>
                                            <Typography type="body2" gutterBottom>
                                                Asunto: {tarea.asunto}
                                            </Typography>
                                            <Typography type="body2" gutterBottom>
                                                Agente: {tarea.agente}
                                            </Typography>
                                            <Typography type="body2" gutterBottom>
                                                Estado: {tarea.estado}
                                            </Typography>
                                            <Typography type="body2" gutterBottom noWrap>
                                                Detalles: {tarea.descripcion}
                                            </Typography>
                                        </CardContent>
                                    })
                                        : ''
                                }
                        </CardContent>
                    </Collapse>

                </Card>
            </div>
        );
    }
}

RecipeReviewCard.propTypes = {
    classes: PropTypes.object.isRequired,
    cliente: PropTypes.object.isRequired
};

export default withStyles(styles)(RecipeReviewCard);