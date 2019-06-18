import { combineReducers } from 'redux';
import auth from 'app/modules/auth/reducer';
import common from 'app/modules/common/reducer';
// import dashboard from 'app/modules/dashboard/reducer';
import dashboardSuperAdmin from 'app/modules/super-admin/dashboard/reducer';
import superAdminOrganization from 'app/modules/super-admin/organization/reducer';
import superAdminTransaction from 'app/modules/super-admin/transaction/reducer';

import organizationDashboard from 'app/modules/organization-admin/dashboard/reducer';
import organizationBranch from 'app/modules/organization-admin/branches/reducer';
import organizationTransaction from 'app/modules/organization-admin/transaction/reducer';
import organizationWallet from 'app/modules/organization-admin/wallet/reducer';

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
    organizationWallet,
    
    branchDashboard,
    branchMembers,
    branchAttendance,
    branchReminders,
    branchQRCode

})

export default app;
