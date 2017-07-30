import { call, fork, take, select, put, cancel } from 'redux-saga/effects';
import flassSaga from './modules/Flass/sagas';

export default function* rootSaga() {
  yield fork(flassSaga);
}
