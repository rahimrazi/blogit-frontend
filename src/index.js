import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux'
import './index.css';
import App from './App';
import store from './redux/store/store';


import { ChakraProvider } from '@chakra-ui/react'
import ChatProvider from './Context/ChatProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChatProvider>
  <Provider store ={store}>
     <ChakraProvider>
    <App />
    </ChakraProvider>
  </Provider>
  </ChatProvider>
);




