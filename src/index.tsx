import './index.css';
import React from 'react';
import {Provider} from "react-redux";
import {store} from "./reducers/store";
import ReactDOM from 'react-dom/client';
import {green, lightBlue} from "@mui/material/colors";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {App} from "./App";

const theme = createTheme({
    palette: {
        primary: lightBlue,
        secondary: green,
        mode: "dark"
    }
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            {/*обнулить стили*/}
            <CssBaseline/>
            <App/>
        </ThemeProvider>
    </Provider>
);

