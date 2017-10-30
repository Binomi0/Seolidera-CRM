import React, { Component } from 'react';
import AppBar from './material/AppBar';
import TopMenu from './material/TopMenu';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { title: props.title }
    }

    render() {
        let { title, subtitle, user } = this.props;
        return (
            <div>
                <AppBar title={`SeoLidera CRM | ${title}`} />
                <p>{subtitle}</p>
                <TopMenu user={user} />
            </div>
        )

    }
}

export default Header;