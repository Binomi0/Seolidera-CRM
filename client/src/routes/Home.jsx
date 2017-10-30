import React from 'react';
import Header from '../components/Header';
// import TopMenu from '../components/material/TopMenu';

class Home extends React.Component {

    render() {
        let user = this.props.match.params.user;
        return (
            <div>
                <Header
                    title="Home"
                    subtitle={user}
                    user={user}
                />
            </div>

    )
    }
}

export default Home;