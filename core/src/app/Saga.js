import { all } from 'redux-saga/effects';
import auth from './modules/auth/saga';
import common from './modules/common/saga';
import superAdminOrganization from 'app/modules/super-admin/organization/saga';
import superAdminTransaction from 'app/modules/super-admin/transaction/saga';
import superAdminDataSet from 'app/modules/super-admin/dataset/saga';

export default function* rootSaga() {
    yield all([ 
        auth(),
        common(),
        superAdminOrganization(),
        superAdminTransaction(),
        superAdminDataSet(),
    ]);
}