/*
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React, { useEffect } from 'react';
import Routes from './navigation'
import { Provider } from 'react-redux';
import store, { RootState } from './redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
/**
 * Main App Component for Basic Set Up
 */
const App = () => {
    const persistor = persistStore(store);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Routes />
            </PersistGate>
        </Provider>

    );
};

export default App;
