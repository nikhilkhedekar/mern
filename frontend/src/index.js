//All other projects
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);

//stripe ryanDhungel
// import React from "react";
// import ReactDOM from 'react-dom/client';
// import "./stripe/ryanDhungel/index.css";
// import App from "./stripe/ryanDhungel/App";

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);

//socketIo kimChen
// import React from 'react';
// import ReactDOM from 'react-dom';
// import './sockerIO/kimChen/index.css';
// import App from './sockerIO/kimChen/App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render( <App /> );

//codingAddict
import React from 'react';
import ReactDOM from 'react-dom/client';
import './codingAddict/index.css';
// import 'normalize.css';
import App from './codingAddict/App';
import { AppProvider } from './codingAddict/context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AppProvider>
            <App />
        </AppProvider>
    </React.StrictMode>
);
