// import React from 'react';
// import ReactDOM from 'react-dom/client';

// import App from './codingAddict/appp';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(

//     <App />

// );

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
