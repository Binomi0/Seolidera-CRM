import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MyButton from './Button'

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        marginTop: 0,
    },
    input: {
        display: 'none',
    },
});

function RaisedButtons(props) {
    const classes = props.classes;
    return (
        <nav>
            <div style={{ display: 'flex', justifyContent: 'center' }} >
                <MyButton toUrl="/clientes" route="Clientes" classes={classes.button}/>
                <MyButton toUrl="/negocios" route="Negocios" classes={classes.button}/>
                <MyButton toUrl="/tareas" route="Tareas" classes={classes.button}/>
                <MyButton toUrl="/llamadas" route="Llamadas" classes={classes.button}/>
                <MyButton toUrl="/ayuda" route="Ayuda" classes={classes.button}/>
            </div>
        </nav>
    );
}

RaisedButtons.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RaisedButtons);