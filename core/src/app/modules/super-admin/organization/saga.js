import { takeEvery, put, call, all } from 'redux-saga/effects';
import { loading, services, watchApiResponse } from 'app/Utils';
import * as c from './constant';

function* list() {
	yield put(loading('GET_ORGANIZATION_LIST'));

	const response = yield call(services.get(`/mng/su/organization`))

	yield put(loading(null));

	yield call(watchApiResponse, response, function*() {
		const { data } = response.data

		yield put({
			type: c.GOT_LIST,
			data
		})
		if(data.length > 0){
			yield show({id:data[0].id})
		}
	})
}

function* show({id}) {
	yield put(loading('GET_ORGANIZATION'));

	const response = yield call(services.get(`/mng/su/organization/${id}`))

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

	const response = yield call(services.post(`/mng/su/organization`), args)

	yield put(loading(null));

	yield call(watchApiResponse, response, function*() {
		const { message } = response.data
		alert.success(message)
		yield list()
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


export default function* (){
	yield all([
		takeEvery(c.GET_LIST, list),
		takeEvery(c.GET_DETAIL, show),
		takeEvery(c.CREATE, create),
		takeEvery(c.GET_REGIONS, regions),
		takeEvery(c.GET_PROVINCES, provinces),
		takeEvery(c.GET_MUNICIPALITIES, municipalities),
		takeEvery(c.GET_BARANGAYS, barangays),
	]);
};