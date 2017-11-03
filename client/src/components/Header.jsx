import React, { Component } from 'react';
import PropTypes from 'prop-types'
import AppBar from './material/AppBar';
import TopMenu from './material/TopMenu';


class Header extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        let { title, subtitle, user, route } = this.props;
        return (
            <div>
                <AppBar title={`SeoLidera CRM | ${title}`} user={user} logout={() => this.props.logout()} />
                <p>{subtitle}</p>
                {
                    user ? <h3>Bienvenido, {user}.</h3> : ''
                }


            </div>
        )

    }
}

Header.PropTypes = {
    title: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired
};

export default Header;