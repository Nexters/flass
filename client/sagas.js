import { fork } from 'redux-saga/effects';
import flassSaga from './modules/Flass/sagas';
import signSaga from './modules/Sign/sagas';

export default function* rootSaga() {
  yield [
    fork(flassSaga),
    fork(signSaga)
  ];
}
