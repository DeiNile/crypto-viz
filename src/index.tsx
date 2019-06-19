import React from 'react';
import ReactDOM from 'react-dom';
import { CryptoViz } from './components/CryptoViz';
import { cryptoGlobals } from './stores/Globals';
import { configure } from 'mobx';

configure({
	enforceActions: 'always'
});

// @ts-ignore Adding the global state to the window for debugging
window.cryptoGlobals = cryptoGlobals;

ReactDOM.render(<CryptoViz />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
