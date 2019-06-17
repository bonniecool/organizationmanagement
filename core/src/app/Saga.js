import { all } from 'redux-saga/effects';
import auth from './modules/auth/saga';
import common from './modules/common/saga';
import superAdminOrganization from 'app/modules/super-admin/organization/saga';
import superAdminTransaction from 'app/modules/super-admin/transaction/saga';
import superAdminDataSet from 'app/modules/super-admin/dataset/saga';

import organizationBranch from 'app/modules/organization-admin/branches/saga';
import organizationTransaction from 'app/modules/organization-admin/branches/saga';

import branchMembers from 'app/modules/branch-admin/members/saga';
import branchAttendance from 'app/modules/branch-admin/attendance/saga';
import branchReminders from 'app/modules/branch-admin/reminders/saga';


export default function* rootSaga() {
    yield all([ 
        auth(),
        common(),
        superAdminOrganization(),
        superAdminTransaction(),
        superAdminDataSet(),

        organizationBranch(),
        organizationTransaction(),

        branchMembers(),
        branchAttendance(),
        branchReminders(),
    ]);
}