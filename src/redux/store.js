import { createStore } from 'redux';
import rootReducer from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
let persistor = persistStore(store);

export default { store, persistor };