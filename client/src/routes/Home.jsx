import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Clientes from "./Clientes";
import Prospectos from './Prospectos';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import classNames from 'classnames';
import logo from '../images/logo-seolidera-sombra.png';

const styles = theme => ({
    row: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        width: 60,
        height: 60,
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});



class Home extends React.Component {

    renderPage(route) {
        switch (route) {
            case 'clientes':
                return <Clientes user={this.props.user.name} />;
            case 'prospectos':
                return <Prospectos changeRoute={() => this.props.setRoute('Home')} />;
            default:
                return ''
        }
    }

    render() {
        let { classes, user, route } = this.props;
        return (
            <div>
                {
                    this.props.route.name !== 'Home'
                    ? ''
                    : <div className={classes.row}>
                        <Avatar
                            alt="Logo Seolidera"
                            src={logo}
                            className={classNames(classes.avatar, classes.bigAvatar)}
                        />
                        <Typography type="display1" gutterBottom>
                            Panel de Control SEOLIDERA CRM
                        </Typography>
                        {
                            user.nombre
                            ? <Typography type="subtitle" gutterBottom>
                                Hola {this.props.user.nombre}.
                            </Typography>
                            : ''
                        }

                    </div>
                }

                {user ? this.renderPage(route.name) : ''}
            </div>
        )
    }
}

Home.PropTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    setRoute: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        route: state.routes,
        user: state.users
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setRoute: (route) => {
            dispatch({
                type: 'SET_ROUTE',
                payload: route
            })
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));