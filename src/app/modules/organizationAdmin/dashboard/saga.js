import { takeEvery, put, call, all } from 'redux-saga/effects';
import { loading, services, watchApiResponse } from 'app/Utils';
import * as c from './constant';

function* activeBranch() {
	yield put(loading('GET_ACTIVE_BRACHES'));

	const response = yield call(services.get(`mng/dashboard/active_branch`))

	yield put(loading(null));

	yield call(watchApiResponse, response, function*() {
		const { data } = response.data

		yield put({
			type: c.GOT_ACTIVE_BRANCHES,
			data
		})
	})
}

function* membersPerBranch() {
	yield put(loading('GET_MEMBERS_PER_BRANCH'));

	const response = yield call(services.get(`mng/dashboard/member_per_branch`))

	yield put(loading(null));

	yield call(watchApiResponse, response, function*() {
		const { data } = response.data

		yield put({
			type: c.GOT_MEMBERS_PER_BRANCH,
			data
		})
	})
}

function* totalBranch() {
	yield put(loading('GET_TOTAL_BRANCH'));

	const response = yield call(services.get(`mng/dashboard/total_branch`))

	yield put(loading(null));

	yield call(watchApiResponse, response, function*() {
		const { data } = response.data

		yield put({
			type: c.GOT_TOTAL_BRANCH,
			data
		})
	})
}


export default function* (){
	yield all([
		takeEvery(c.GET_ACTIVE_BRANCHES, activeBranch),
		takeEvery(c.GET_MEMBERS_PER_BRANCH, membersPerBranch),
		takeEvery(c.GET_TOTAL_BRANCH, totalBranch),
	]);
};