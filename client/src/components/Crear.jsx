import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        float: 'right',
    },
});

function FloatingActionButtons(props) {
    const { classes, activateAction, route } = props;
    // function addAction(e) {
    //     activateAction(e)
    // }
    return (
        <Button
            href={`http://asus.onrubia.es:3001/crear${route}`}
            // onClick={(e) => addAction(true)}
            fab={true}
            color="accent"
            aria-label="add"
            className={classes.button}
        >
            <AddIcon />
        </Button>
    );
}

FloatingActionButtons.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingActionButtons);