import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme } from 'material-ui/styles';
import { indigo500, red500 } from 'material-ui/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

injectTapEventPlugin();

const muitheme = createMuiTheme({
    palette: {
        primary: red500,
        secondary: indigo500,
    },

});

ReactDOM.render(
    <MuiThemeProvider theme={muitheme}>
        <App/>
    </MuiThemeProvider>,
    document.getElementById('root')
);
registerServiceWorker();
