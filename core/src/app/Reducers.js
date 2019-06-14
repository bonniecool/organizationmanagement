import { combineReducers } from 'redux';
import auth from 'app/modules/auth/reducer';
import common from 'app/modules/common/reducer';
// import dashboard from 'app/modules/dashboard/reducer';
import dashboardSuperAdmin from 'app/modules/super-admin/dashboard/reducer';
import superAdminOrganization from 'app/modules/super-admin/organization/reducer';
import superAdminTransaction from 'app/modules/super-admin/transaction/reducer';
import superAdminDataSet from 'app/modules/super-admin/dataset/reducer';


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
    superAdminDataSet,

})

export default app;
