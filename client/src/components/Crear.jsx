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
    const { classes, addClient } = props;
    // function addAction(e) {
    //     activateAction(e)
    // }
    return (
        <Button
            // href={`/api/crear${route}`}
            onClick={(e) => addClient(true)}
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