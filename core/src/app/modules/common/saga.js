import { takeEvery, put, call, all } from 'redux-saga/effects';
import { loading, services, watchApiResponse } from 'app/Utils';
import * as c from './constant';

function* getCitizenship() {

	yield put(loading('GET_CITIZENSHIP'));

	const responce = yield call(services.get(`agn/dataset/citizenship`), {paginate:0});

	yield put(loading(null));

	yield call(watchApiResponse, responce, function*() {
		const { data } = responce.data

		const args = data.map(item => {
			const newItem = {
				label: item.name.toUpperCase(),
				value: item.name.toUpperCase()
			}

			return newItem
		})

		yield put({
			type: c.GOT_CITIZENSHIP,
			data: args
		})

	})
}

function* getReligions() {

	yield put(loading('GET_RELIGIONS'));

	const responce = yield call(services.get(`agn/dataset/religion`));

	yield put(loading(null));

	yield call(watchApiResponse, responce, function*() {
		const { data } = responce.data

		const args = data.map(item => {
			const newItem = {
				label: item.name.toUpperCase(),
				value: item.name.toUpperCase()
			}

			return newItem
		})

		yield put({
			type: c.GOT_RELIGIONS,
			data: args
		})

	})
}

function* getCountry() {

	yield put(loading('GET_COUNTRY'));

	const responce = yield call(services.get(`agn/dataset/country`), {paginate:0});

	yield put(loading(null));

	yield call(watchApiResponse, responce, function*() {
		const { data } = responce.data

		const args = data.map(item => {
			const newItem = {
				label: item.name.toUpperCase(),
				value: item.code,
				id: +item.id
			}

			return newItem
		})

		yield put({
			type: c.GOT_COUNTRY,
			data: args
		})

	})
}

function* getAllAgency() {
	
	yield put(loading('GET_ALL_AGENCY'));

	const responce = yield call(services.get(`mng/agency`));

	yield put(loading(null));

	yield call(watchApiResponse, responce, function*() {
		const { data } = responce.data

		const args = data.map(item => {
			const newItem = {
				value: item.id,
				label: item.name,
				logo: item.logo
			}
			return newItem
		})

		yield put({
			type: c.GOT_ALL_AGENCY,
			data: args
		})

	})

}

function* getAllService({ id }) {

	/*yield put(loading('GET_ALL_AGENCY'));

	const responce = yield call(services.get(`mng/agency/${id}/service`));

	yield put(loading(null));

	yield call(watchApiResponse, responce, function*() {
		const { data } = responce.data

		const args = data.map(item => {
			const newItem = {
				value: item.id,
				label: item.name,
				logo: item.logo
			}
			return newItem
		})

		yield put({
			type: c.GOT_ALL_SERVICE,
			data: args
		})

	})*/
}

export default function* (){
	yield all([
		takeEvery(c.GET_CITIZENSHIP, getCitizenship),
		takeEvery(c.GET_RELIGIONS, getReligions),
		takeEvery(c.GET_COUNTRY, getCountry),
		takeEvery(c.GET_ALL_AGENCY, getAllAgency),
		takeEvery(c.GET_ALL_SERVICE, getAllService),
	]);
};