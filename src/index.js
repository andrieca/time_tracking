import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { app } from './components/firebase';
import { getAuth } from 'firebase/auth';
import 'firebase/storage';
import "firebase/firestore";
import firebase from 'firebase/compat/app';
import { createContext } from 'react';

export const Context = createContext(null);
const auth = getAuth(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        firebase,
        auth
      }}>
    <App />
    </Context.Provider>
);













