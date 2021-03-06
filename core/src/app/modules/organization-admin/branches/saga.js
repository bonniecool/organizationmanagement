import { takeEvery, put, call, all } from 'redux-saga/effects';
import { loading, services, watchApiResponse, alert } from 'app/Utils';
import * as c from './constant';

function* list() {
	yield put(loading('GET_BRANCH'));

	const response = yield call(services.get(`/mng/branch`))

	yield put(loading(null));

	yield call(watchApiResponse, response, function*() {
		const { data } = response.data

		yield put({
			type: c.GOT_LIST,
			data
		})
		if(data.length > 0){
			yield show({id:data[0].id})
			yield members({id:data[0].id})
		}
			
	})
}

function* show({id}) {
	yield put(loading('SHOW_BRANCH'));

	const response = yield call(services.get(`/mng/branch/${id}`))

	yield put(loading(null));

	yield call(watchApiResponse, response, function*() {
		const { data } = response.data

		yield put({
			type: c.GOT_DETAILS,
			data
		})
		yield members({id})
	})
}

function* create({args}) {
	yield put(loading('CREATE_ORGANIZATION_LIST'));

	const response = yield call(services.post(`/mng/branch`), args)

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

function* update({id,args}) {
	yield put(loading('CREATE_ORGANIZATION_LIST'));

	const response = yield call(services.put(`/mng/branch/${id}`), args)

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

function* members({id}) {
	yield put(loading('GET_MEMBERS'));

	const response = yield call(services.get(`mng/branch/${id}/user`))

	yield put(loading(null));

	yield call(watchApiResponse, response, function*() {
		const { data } = response.data

		yield put({
			type: c.GOT_MEMBERS,
			data
		})

	})
}

function* createMember({id, args}) {
	yield put(loading('CREATE_MEMBER'));

	const response = yield call(services.post(`mng/branch/${id}/user`), args)

	yield put(loading(null));

	yield call(watchApiResponse, response, function*() {
		const { message } = response.data
		alert.success(message)
		yield members({id:id})
		yield put({
			type: 'MODAL',
			data: {
					isOpen: false
			}
		})

	})
}

function* updateMember({id, args}) {
	yield put(loading('UPDATE_MEMBER'));

	const response = yield call(services.put(`mng/branch/${id}/user/${args.id}`), args)

	yield put(loading(null));

	yield call(watchApiResponse, response, function*() {
		const { message } = response.data
		alert.success(message)
		yield members({id:id})
		yield put({
			type: 'MODAL',
			data: {
					isOpen: false
			}
		})

	})
}

function* removeMember({id, args}) {
	yield put(loading('REMOVE_MEMBER'));

	const response = yield call(services.remove(`mng/branch/${id}/user/${args.id}`))

	yield put(loading(null));

	yield call(watchApiResponse, response, function*() {
		const { message } = response.data
		alert.success(message)
		yield members({id:id})
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
		takeEvery(c.GET_DETAILS, show),
		takeEvery(c.CREATE, create),
		takeEvery(c.UPDATE, update),
		takeEvery(c.GET_REGIONS, regions),
		takeEvery(c.GET_PROVINCES, provinces),
		takeEvery(c.GET_MUNICIPALITIES, municipalities),
		takeEvery(c.GET_BARANGAYS, barangays),
		takeEvery(c.GET_MEMBERS, members),
		takeEvery(c.CREATE_MEMBER, createMember),
		takeEvery(c.UPDATE_MEMBER, updateMember),
		takeEvery(c.REMOVE_MEMBER, removeMember),
	]);
};