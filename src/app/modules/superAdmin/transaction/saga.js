import { takeEvery, put, call, all } from 'redux-saga/effects';
import { loading, services, watchApiResponse } from 'app/Utils';
import * as c from './constant';

function* list() {
	yield put(loading('GET_STATISTIC'));

	const response = yield call(services.get(`mng/su/payment`))

	yield put(loading(null));

	yield call(watchApiResponse, response, function*() {
		const { data } = response.data

		yield put({
			type: c.GOT_LIST,
			data
		})
	})
}


export default function* (){
	yield all([
		takeEvery(c.GET_LIST, list),
	]);
};