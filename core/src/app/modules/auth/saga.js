import { takeEvery, put, call, all } from 'redux-saga/effects';
import {
    loading,
    alert,
    history,
    services,
    watchApiResponse
} from '../../Utils';
import * as c from './constant';

function* checkAuthentication() {
    const token = sessionStorage.getItem('token');
    if(token) {
        yield put({
                type: "AUTHENTICATE",
                isSuccess: true
            })
        return;
    }

    yield put({
        type: "AUTHENTICATE",
        isSuccess: false
    })
    history.push('/')
}

function* login({ args }){
    yield put(loading('LOGIN'));

    const response = yield call(services.post(`/agn/auth`), args);

    yield put(loading(null));

    yield call(watchApiResponse, response, function*(){

        const { token } = response.data;
        
        sessionStorage.setItem('token', token);
       
        yield put({
            type: "AUTHENTICATE",
            isSuccess: true
        })

        history.push('/')

        yield myProfile();
        yield permissions();

        
    })
    
}


function* permissions(){
    yield put(loading('PERMISSIONS'));

    const response = yield call(services.get(`/agn/acl/my/permissions`));
    yield put(loading(null));

    yield call(watchApiResponse, response, function*(){
        const { data } = response.data;
            yield put({
                type:c.PERMISSIONS,
                data
            })
            sessionStorage.setItem('permission', JSON.stringify(data));
    })
    
}

function* logout(){

    yield put({
        type: "RESET_AUTH"
    })

    yield put(loading('SIGN_OUT'));

    sessionStorage.clear();
    alert.warning("You have logged out");

    yield put(loading(null));

    yield put({
        type: 'MODAL',
        data : {
            isOpen: false,
        }
    })

    yield put({
        type: "AUTHENTICATE",
        isSuccess: false
    })


    history.push({ pathname: '/signin'});
}

function* forgotPassword({ args }){
    yield put(loading('FORGOT_PASSWORD'));

    yield put(loading(null));

    alert.warning(`Password reset code has been set to "${args.email}"`);

    history.push({ pathname: '/reset-password' })
}

function* verifyResetCode({ code, cb }){
    yield put(loading('VERIFY_RESET_CODE'));


    yield put(loading(null));
    
    const isExpired = false;

    cb(isExpired);
}

function* resetPassword({ args }){
    yield put(loading('RESET_PASSWORD'));

    yield put(loading(null));
    
    alert.warning(`Password has been reset.`);

    history.push({ pathname: '/' })
}

function* changePassword({ args, cb }){
    yield put(loading('CHANGE_PASSWORD'));

    yield put(loading(null));
    
    alert.warning(`Password has been changed.`);

    cb();   

    history.push('/');
}

function* register({ args }){
    yield put(loading('REGISTER'));

    yield put(loading(null));
    
    alert.success(`Account Created!`);

    history.push({
        pathname: `/`
    })
}

function* myProfile() {

    const response = yield call(services.get(`/my/profile`));

    yield call(watchApiResponse, response, function*(){

        const { data } = response.data;

        yield put({
            type: "PROFILE",
            data,
            user_type: data.profile_type === "SuperAdministrator" ? 1 : 0
        })
    })
}

export default function* authSaga() {
    yield all([ 
        takeEvery("CHECK_AUTH", checkAuthentication),
        takeEvery("LOGIN", login),
        takeEvery("SIGN_OUT", logout),
        takeEvery("FORGOT_PASSWORD", forgotPassword),
        takeEvery("VERIFY_RESET_CODE", verifyResetCode),
        takeEvery("RESET_PASSWORD", resetPassword),
        takeEvery("CHANGE_PASSWORD", changePassword),
        takeEvery("REGISTER", register),
        takeEvery("MY_PROFILE", myProfile),
        takeEvery("GET_PERMISSIONS", permissions)
    ])
}