import React from 'react';
import ReactDOM from 'react-dom/client';
import 'assets/css/App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ChakraProvider theme={theme}>
        <ThemeEditorProvider>
          <Router>
            <App />
          </Router>
        </ThemeEditorProvider>
      </ChakraProvider>
    </PersistGate>
  </Provider>
);
