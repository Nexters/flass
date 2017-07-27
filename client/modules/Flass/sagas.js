import { call, fork, take, select, put, cancel } from 'redux-saga/effects';
import flassGrid from './FlassGrid/FlassGridActions';

export default function* rootSaga() {
  yield fork(flassGrid);
}
