import { takeEvery, put, call, all } from 'redux-saga/effects';
import { loading, services, watchApiResponse } from 'app/Utils';
import * as c from './constant';

function* list() {
	yield put(loading('GET_PAYMENT'));

	const response = yield call(services.get(`/mng/payment`))

	yield put(loading(null));

	yield call(watchApiResponse, response, function*() {
		const { data } = response.data

		yield put({
			type: c.GOT_LIST,
			data
		})
	})
}

function* create({args}) {
	yield put(loading('PAY_CREDIT'));

	const response = yield call(services.post(`/wallet/load`), args)

	yield put(loading(null));

	yield call(watchApiResponse, response, function*() {
		const { data, message } = response.data
		yield put({
			type:c.SET_FORM_DATA,
			data:{
				refno:data.refno,
				message:message || ''
			}
		})
	})
}


export default function* (){
	yield all([
		takeEvery(c.GET_LIST, list),
		takeEvery(c.CREATE, create),
	]);
};