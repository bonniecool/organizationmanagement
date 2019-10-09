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
    const user_type = sessionStorage.getItem('user_type');
    if(token) {
        yield put({
                type: "AUTHENTICATE",
                isSuccess: true,
                user_type:user_type
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

    const response = yield call(services.post(`/mng/auth`), args);

    yield put(loading(null));

    yield call(watchApiResponse, response, function*(){

        const { data } = response.data;
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('user_type', data.profile_type);
       
        yield put({
            type: "AUTHENTICATE",
            isSuccess: true,
            user_type: data.profile_type
        })

        history.push('/')

        yield myProfile({user_type:data.profile_type});
        // yield permissions();

        
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


    history.push({ pathname: '/'});
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

// function* register({ args }){
//     yield put(loading('REGISTER'));

//     yield put(loading(null));
    
//     alert.success(`Account Created!`);

//     history.push({
//         pathname: `/`
//     })
// }

function* register({ args }){
    yield put(loading('REGISTER'));

    const response = yield call(services.post(`organization/register`), args);

    yield put(loading(null));

    yield call(watchApiResponse, response, function*(){
        const{ message } = response.data
        alert.success(message)
        history.push('/')
    })
    
}

function* myProfile({user_type}) {

    let response = ''
    if(user_type === 'SuperAdmin')
        response = yield call(services.get(`mng/su/my/profile`));
    if(user_type === 'Administrator')
        response = yield call(services.get(`mng/my/profile`));
    if(user_type === 'BranchAdministrator')
        response = yield call(services.get(`mng/brc/my/profile`));

    yield call(watchApiResponse, response, function*(){

        const { data } = response.data;
        yield put({
            type: "PROFILE",
            data,
            user_type: user_type
        })
    })
}



function* regions() {
	yield put(loading('GET_REGIONS'));

	const response = yield call(services.get(`/common/regions`))

	yield put(loading(null));

	yield call(watchApiResponse, response, function*() {
		const { data } = response.data

		yield put({
			type: c.GOT_REGIONS,
			data
		})

	})
}

function* provinces({region_id}) {
	yield put(loading('GET_PROVINCES'));

	const response = yield call(services.get(`/common/regions/${region_id}/provinces`))

	yield put(loading(null));

	yield call(watchApiResponse, response, function*() {
		const { data } = response.data

		yield put({
			type: c.GOT_PROVINCES,
			data
		})

	})
}

function* municipalities({region_id, province_id}) {
	yield put(loading('GET_MUNICIPALITIES'));

	const response = yield call(services.get(`/common/regions/${region_id}/provinces/${province_id}/municipalities`))

	yield put(loading(null));

	yield call(watchApiResponse, response, function*() {
		const { data } = response.data

		yield put({
			type: c.GOT_MUNICIPALITIES,
			data
		})

	})
}

function* barangays({region_id, province_id, municipality_id}) {
	yield put(loading('GET_BARANGAYS'));

	const response = yield call(services.get(`/common/regions/${region_id}/provinces/${province_id}/municipalities/${municipality_id}/barangay`))

	yield put(loading(null));

	yield call(watchApiResponse, response, function*() {
		const { data } = response.data

		yield put({
			type: c.GOT_BARANGAYS,
			data
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
        takeEvery("GET_PERMISSIONS", permissions),
        takeEvery(c.GET_REGIONS, regions),
		takeEvery(c.GET_PROVINCES, provinces),
		takeEvery(c.GET_MUNICIPALITIES, municipalities),
		takeEvery(c.GET_BARANGAYS, barangays),
    ])
}