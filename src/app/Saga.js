import { all } from 'redux-saga/effects';
import auth from './modules/auth/saga';
import common from './modules/common/saga';
import superAdminOrganization from 'app/modules/superAdmin/organization/saga';
import superAdminTransaction from 'app/modules/superAdmin/transaction/saga';
import dashboardSuperAdmin from 'app/modules/superAdmin/dashboard/saga';

import organizationDashboard from 'app/modules/organizationAdmin/dashboard/saga';
import organizationBranch from 'app/modules/organizationAdmin/branch/saga';
import organizationTransaction from 'app/modules/organizationAdmin/transaction/saga';
import organizationWallet from 'app/modules/organizationAdmin/wallet/saga';

import branchDashboard from 'app/modules/branchAdmin/dashboard/saga';
import branchMembers from 'app/modules/branchAdmin/members/saga';
import branchAttendance from 'app/modules/branchAdmin/attendance/saga';
// import branchReminders from 'app/modules/branchAdmin/reminders/saga';
import branchQRCode from 'app/modules/branchAdmin/qr-code/saga';


export default function* rootSaga() {
    yield all([ 
        auth(),
        common(),
        superAdminOrganization(),
        superAdminTransaction(),
        dashboardSuperAdmin(),

        organizationDashboard(),
        organizationBranch(),
        organizationTransaction(),
        organizationWallet(),

        branchDashboard(),
        branchMembers(),
        // branchAttendance(),
        // branchReminders(),
        // branchQRCode(),
    ]);
}