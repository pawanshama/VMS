import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import SignUp from './components/SignUp';
// import SignIn from './components/signin';
// import { BrowserRouter,Routes,Route } from 'react-router-dom';
// import SignUp from './components/SignUp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
     <App/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
