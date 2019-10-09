import { loading, apiError } from './modules/common/action'; 
import { getFirstMessage, loadState, virtualizeHighlighter, currency } from './Helpers';
import { call, put } from 'redux-saga/effects';
import * as services from './Services';
import alert from 'react-s-alert';
import history from './History';
import _ from 'lodash';
import AsyncComponent from './AsyncComponent';
import moment from 'moment-timezone';

function* watchApiResponse(response = {}, responseOk = function* (){}, responseNotOkay = function* (){}) {

    if(response.status === 200){
        yield call(responseOk);
    }

    if(response.status === 201){
        yield call(responseOk);
    }

    if(response.status === 422){
        alert.error(getFirstMessage(response.data.errors));
    }

    if(response.status === 403){
        alert.error(response.data.message || getFirstMessage(response.data.message));
    }

<<<<<<< HEAD
    if(response.status === 403 && response.data.message === "Token expired.") {
=======
    if(response.status === 403 && response.data.message === "Token Expired") {
>>>>>>> 09eb3b6a8b8895fc43f0167ad287a5ee56d72ecb
        alert.error('Session Expired');
        yield put({
            type: "SIGN_OUT"
        })
    }

    if(response.status === 500) {
        alert.error('Oops! Something went wrong. Please contact web admin')
    }

    if(response.status === 400 || response.status === 404){
        alert.error(response.data.message || getFirstMessage(response.data.errors));
    }
}

const loadExternalAPI = (doc, type, id, src, onLoad) => {
    var js, fjs = doc.getElementsByTagName(type)[0];
    if (doc.getElementById(id)) {
        onLoad();
        return;
    }
    js = doc.createElement(type); 
    js.id = id;
    js.src = src;
    js.onload = onLoad;
    fjs.parentNode.insertBefore(js, fjs);       
}

export {
    loading,
    alert,
    history,
    services,
    apiError,
    watchApiResponse,
    loadState,
    AsyncComponent,
    _,
    moment,
    virtualizeHighlighter,
    loadExternalAPI,
    currency
}