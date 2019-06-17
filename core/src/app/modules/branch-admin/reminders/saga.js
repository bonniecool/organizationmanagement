import { takeEvery, put, call, all } from 'redux-saga/effects';
import { loading, services, watchApiResponse, alert } from 'app/Utils';
import * as c from './constant';

function* list() {
	yield put(loading('GET_REMINDERS'));

	const response = yield call(services.get(`/mng/brc/reminder`))

	yield put(loading(null));

	yield call(watchApiResponse, response, function*() {
		const { data } = response.data

		yield put({
			type: c.GOT_LIST,
			data
		})
		if(data.length > 0)
		 yield show({id:data[0].id})
	})
}


function* show({id}) {
	yield put(loading('GET_REMINDER'));

	const response = yield call(services.get(`/mng/brc/reminder/${id}`))

	yield put(loading(null));

	yield call(watchApiResponse, response, function*() {
		const { data } = response.data

		yield put({
			type: c.GOT_DETAIL,
			data
		})
	})
}

function* create({args}) {
	yield put(loading('CREATE_ORGANIZATION_LIST'));

	const response = yield call(services.post(`/mng/brc/reminder`), args)

	yield put(loading(null));

	yield call(watchApiResponse, response, function*() {
		const { message } = response.data
		alert.success(message)

		yield list()

		yield put({
			type: 'MODAL',
			data: {
					isOpen: false
			}
	})
	})
}

function* update({id, args}) {
	yield put(loading('CREATE_ORGANIZATION_LIST'));

	const response = yield call(services.put(`/mng/brc/reminder/${id}`), args)

	yield put(loading(null));

	yield call(watchApiResponse, response, function*() {
		const { message } = response.data
		alert.success(message)

		yield list()

		yield put({
			type: 'MODAL',
			data: {
					isOpen: false
			}
	})
	})
}

function* remove({id}) {
	yield put(loading('SEND_SMS'));

	const response = yield call(services.remove(`mng/brc/reminder/${id}`))

	yield put(loading(null));

	yield call(watchApiResponse, response, function*() {
		const { message } = response.data
		alert.success(message)
		yield list()
		yield put({
			type: 'MODAL',
			data: {
					isOpen: false
			}
	})
	})
}

function* sendsms({id}) {
	yield put(loading('SEND_SMS'));

	const response = yield call(services.post(`mng/brc/reminder/${id}/send`))

	yield put(loading(null));

	yield call(watchApiResponse, response, function*() {
		const { message } = response.data
		alert.success(message)

		yield put({
			type: 'MODAL',
			data: {
					isOpen: false
			}
	})
	})
}


export default function* (){
	yield all([
		takeEvery(c.GET_LIST, list),
		takeEvery(c.GET_DETAIL, show),
		takeEvery(c.CREATE, create),
		takeEvery(c.UPDATE, update),
		takeEvery(c.REMOVE, remove),
		takeEvery(c.SEND_SMS, sendsms),
	]);
};