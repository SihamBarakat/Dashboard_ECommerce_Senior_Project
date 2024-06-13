import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';
import { Auth } from './login/Auth';

ReactDOM.render(
 
  <ContextProvider>
  <App />
</ContextProvider>

  
  ,document.getElementById('root'),
);
