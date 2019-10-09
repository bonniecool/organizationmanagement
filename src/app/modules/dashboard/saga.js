import { takeEvery, put, call, all } from 'redux-saga/effects';
import { loading, services, watchApiResponse } from 'app/Utils';
import * as c from './constant';

function* getStatistic() {
	yield put(loading('GET_STATISTIC'));

	const response = yield call(services.get(`/agn/dashboard`))

	yield put(loading(null));

	yield call(watchApiResponse, response, function*() {
		const { data } = response.data

		yield put({
			type: c.GOT_STATISTIC,
			data
		})
	})
}


export default function* (){
	yield all([
		takeEvery(c.GET_STATISTIC, getStatistic),
	]);
};