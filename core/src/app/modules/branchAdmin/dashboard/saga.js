import { takeEvery, put, call, all } from 'redux-saga/effects';
import { loading, services, watchApiResponse } from 'app/Utils';
import * as c from './constant';

function* getAttendees() {
	yield put(loading('GET_ATTENDEES'));

	const response = yield call(services.get(`/mng/brc/dashboard/top_attendees`))

	yield put(loading(null));

	yield call(watchApiResponse, response, function*() {
		const { data } = response.data

		yield put({
			type: c.GOT_ATTENDEES,
			data
		})
	})
}


export default function* (){
	yield all([
		takeEvery(c.GET_ATTENDEES, getAttendees),
	]);
};