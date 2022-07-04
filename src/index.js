import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { 
  ApolloProvider,
  InMemoryCache,
  ApolloClient,
} from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});



ReactDOM.render(
  
  
    <ApolloProvider client={client}>
      
    {/* <LoaderProvider indicator={<BallTriangle width="100" />}> */}
    <App/>
    {/* </LoaderProvider> */}
    </ApolloProvider>
  , document.getElementById('root')
  );

  




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();