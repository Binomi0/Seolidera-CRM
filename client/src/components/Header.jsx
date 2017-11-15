import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles';
import AppBar from './material/AppBar';
import Typograpghy from 'material-ui/Typography'
import BlurOn from 'material-ui-icons/BlurOn';
import IconButton from 'material-ui/IconButton';

// import TopMenu from './material/TopMenu';

const styles = theme => ({
    container: {
        margin: theme.spacing.unit,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    button: {
        marginTop: 0
    }
});

class Header extends Component {

    render() {
        const { title, subtitle, user, classes } = this.props;
        return (
            <div>
                <AppBar title={`SeoLidera CRM | ${title}`} user={user} logout={() => this.props.logout()} />
                <p style={{float: 'right', marginRight: 10}}>{subtitle}</p>
                {
                    user
                    ?   <div className={classes.container}>
                            <Typograpghy type="title">Sonríe para la vida, no solo para la foto.
                                <IconButton className={classes.button} color="primary">
                                    <BlurOn/>
                                </IconButton>
                            </Typograpghy>
                        </div>
                    :   ''
                }
            </div>
        )
    }
}

Header.PropTypes = {
    title: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);