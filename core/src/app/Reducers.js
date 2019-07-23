import { combineReducers } from 'redux';
import auth from 'app/modules/auth/reducer';
import common from 'app/modules/common/reducer';
// import dashboard from 'app/modules/dashboard/reducer';
import dashboardSuperAdmin from 'app/modules/superAdmin/dashboard/reducer';
import superAdminOrganization from 'app/modules/superAdmin/organization/reducer';
import superAdminTransaction from 'app/modules/superAdmin/transaction/reducer';

import organizationDashboard from 'app/modules/organizationAdmin/dashboard/reducer';
import organizationBranch from 'app/modules/organizationAdmin/branch/reducer';
import organizationTransaction from 'app/modules/organizationAdmin/transaction/reducer';
import organizationWallet from 'app/modules/organizationAdmin/wallet/reducer';

import branchDashboard from 'app/modules/branch-admin/dashboard/reducer';
import branchMembers from 'app/modules/branch-admin/members/reducer';
import branchAttendance from 'app/modules/branch-admin/attendance/reducer';
import branchReminders from 'app/modules/branch-admin/reminders/reducer';
import branchQRCode from 'app/modules/branch-admin/qr-code/reducer';


const app = combineReducers({
    loading: common.loading, 
    modal: common.modal, 
    nav: common.nav,
    citizenship: common.citizenship,
    religions: common.religions,
    countryList: common.countryList,
    organizationLookups: common.organizationList,
    auth,
    // dashboard,
    dashboardSuperAdmin,
    superAdminOrganization,
    superAdminTransaction,

    organizationDashboard,
    organizationBranch,
    organizationTransaction,
    // organizationWallet,
    
    // branchDashboard,
    // branchMembers,
    // branchAttendance,
    // branchReminders,
    // branchQRCode,

})

export default app;
