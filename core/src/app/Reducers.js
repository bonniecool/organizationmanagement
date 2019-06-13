import { combineReducers } from 'redux';
import auth from 'app/modules/auth/reducer';
import common from 'app/modules/common/reducer';


const app = combineReducers({
    loading: common.loading, 
    modal: common.modal, 
    nav: common.nav,
    citizenship: common.citizenship,
    religions: common.religions,
    countryList: common.countryList,
    organizationLookups: common.organizationList,
    auth,
})

export default app;
