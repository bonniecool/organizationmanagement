import { all } from 'redux-saga/effects';
import auth from './modules/auth/saga';
import common from './modules/common/saga';


export default function* rootSaga() {
    yield all([ 
        auth(),
        common(),
    ]);
}