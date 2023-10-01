import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import productsReducer, { IInitialState } from './slices/shoppingSlice';
import {
    PersistConfig,
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import createWebStorage from 'redux-persist/es/storage/createWebStorage';
import { WebStorage } from 'redux-persist/es/types';

export function createPersistStore(): WebStorage {
    const isServer = typeof window === 'undefined';

    if (isServer) {
        return {
            getItem() {
                return Promise.resolve(null);
            },
            setItem() {
                return Promise.resolve();
            },
            removeItem() {
                return Promise.resolve();
            },
        };
    }

    return createWebStorage('local');
}

const storage =
    typeof window !== 'undefined'
        ? createWebStorage('local')
        : createPersistStore();

const persistConfig: PersistConfig<IInitialState> = {
    key: 'root',
    version: 1,
    storage,
};

const persistedReducer = persistReducer(persistConfig, productsReducer);

export const store = configureStore({
    reducer: {
        shopping: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
