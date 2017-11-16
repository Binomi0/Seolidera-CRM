import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Clientes from "./Clientes";
import Prospectos from './Prospectos';

// import Header from '../components/Header';
// import TopMenu from '../components/material/TopMenu';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            route: props.route || 'home',
            user: props.user,
        }
    }

    handleState() {

    }

    changeRoute() {
        this.setState({ route: 'home'})
    }

    renderPage(route) {
        switch (route) {
            case 'clientes':
                return <Clientes user={this.state.user} />;
            case 'prospectos':
                return <Prospectos changeRoute={this.changeRoute.bind(this)} />;
            default:
                return ''
        }
    }

    render() {
        let { classes, user } = this.props;
        let { route } = this.state;
        return (
            <div>

                <Button
                    raised
                    color="accent"
                    className={classes.button}
                    onClick={() => this.setState({ route: 'clientes' })}
                >
                    Clientes
                </Button>
                <Button raised
                        color="accent"
                        className={classes.button}
                        onClick={() => this.setState({ route: 'prospectos' })}
                >
                    Prospectos
                </Button>
                {this.renderPage(route)}
            </div>
        )
    }
}

Home.PropTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired
};

export default withStyles(styles)(Home);