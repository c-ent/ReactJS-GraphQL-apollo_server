import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'; //add
import { BrowserRouter, Router } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';



const client = new ApolloClient({ 
  uri: 'http://localhost:4000/graphql', //putting this on env file
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

      <BrowserRouter>
        <AuthProvider>
          <ApolloProvider client={client}>
            <App />
          </ApolloProvider>
          </AuthProvider>
      </BrowserRouter>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
