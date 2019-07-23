import { takeEvery, put, call, all } from 'redux-saga/effects';
import { loading, services, watchApiResponse } from 'app/Utils';
import * as c from './constant';

function* membersPerOrganization() {
	yield put(loading('GET_ORGANIZATION'));
	console.log('here')
	const response = yield call(services.get(`/mng/su/dashboard/member_per_organization`))

	yield put(loading(null));

	yield call(watchApiResponse, response, function*() {
		const { data } = response.data

		yield put({
			type: c.GOT_MEMBERS,
			data
		})
	})
}

function* organizationPerType() {
	yield put(loading('GET_STATISTIC'));

	const response = yield call(services.get(`/mng/su/dashboard/organization_per_type`))

	yield put(loading(null));

	yield call(watchApiResponse, response, function*() {
		const { data } = response.data

		yield put({
			type: c.GOT_ORGANIZATION_TYPE,
			data
		})
	})
}

function* totalOrganization() {
	yield put(loading('GET_STATISTIC'));

	const response = yield call(services.get(`/mng/su/dashboard/total_organization`))

	yield put(loading(null));

	yield call(watchApiResponse, response, function*() {
		const { data } = response.data

		yield put({
			type: c.GOT_TOTAL_ORGANIZATION,
			data
		})
	})
}


export default function* (){
	yield all([
		takeEvery(c.GET_MEMBERS, membersPerOrganization),
		takeEvery(c.GET_ORGANIZATION_TYPE, organizationPerType),
		takeEvery(c.GET_TOTAL_ORGANIZATION, totalOrganization),
	]);
};