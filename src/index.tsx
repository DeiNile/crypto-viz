import React from 'react';
import ReactDOM from 'react-dom';
import { CryptoViz } from './components/CryptoViz';
import { configure } from 'mobx';

configure({
	enforceActions: 'always'
});


ReactDOM.render(<CryptoViz />, document.getElementById('root'));
