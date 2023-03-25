import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './App';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {green, lightBlue} from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: lightBlue,
        secondary: green,
        mode:"dark"
    }
})

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement);
root.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <App/>
    </ThemeProvider>
);

