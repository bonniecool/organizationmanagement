import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import RootSaga from './Saga';
import RootReducer from './Reducers';
import { fromJS } from 'immutable';

import { _ , loadState } from 'app/Utils';

const saveState = async (state) => {
    try{
        const serializedState = JSON.stringify(state);
        await sessionStorage.setItem('_store', serializedState);
    } catch(err) {
        console.log(err);
        //ignore error...
    }
}

const storeOnChange = (store) => async () => {

    const auth = store.getState().auth.toJS();
    
    const whitelist = ['auth', 'citizenship', 'dataset', 'religions', 'permanentAddress', 'countryList', 'plantilla', 'organizationLookups'];

    if(auth.isAuthenticated) {
        await saveState({
            ..._.pick(store.getState(), whitelist)
        })
    }
}

export default async () => {

    const sagaMiddleware = createSagaMiddleware();

    const previousState = await loadState();
    const initialState = {};

    _.keys(previousState).map((key, i) => {
        initialState[key] = fromJS(previousState[key])
        return null;
    })

    const store = createStore(
        RootReducer, 
        initialState,
        compose(
            applyMiddleware(sagaMiddleware)
        )
    );

    sagaMiddleware.run(RootSaga);

    store.subscribe(_.throttle(storeOnChange(store)), 1000);

    return store;
}