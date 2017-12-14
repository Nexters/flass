import { call, fork, take, select, put, cancel, takeLatest, takeEvery } from 'redux-saga/effects';

const setItemToLocalStorage = (key, value) => {
  return new Promise(resolve => {
    localStorage.setItem(key, value);
    return resolve();
  });
};

const getItemFromLocalStorage = key => {
  return new Promise(resolve => resolve(localStorage.getItem(key)));
};

function createLazily(msec = 1000) {
  let ongoing;
  return function* (task, ...args) {
    if (ongoing && ongoing.isRunning()) {
      ongoing.cancel();
    }
    ongoing = yield fork(function* () {
      yield call(delay, msec);
      yield fork(task, ...args);
    });
  };
}

function* fetchEntity(entity, apiFn, ...args) {
  yield put(entity.fetch());
  try {
    const result = yield call(apiFn, ...args);
    yield put(entity.success(result));
  } catch (err) {
    yield put(entity.failure(err));
  }
}

export {
  setItemToLocalStorage,
  getItemFromLocalStorage,
  createLazily,
  fetchEntity,
};
