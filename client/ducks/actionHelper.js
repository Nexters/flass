import { FAILURE, FETCH, SUCCESS } from './constants';

export const createActionDispatchers = actionCreators => dispatch =>
  Object.keys(actionCreators).reduce((actionDispatchers, name) => {
    var actionCreator = actionCreators[name];
    if (typeof actionCreator == 'function') {
      actionDispatchers[name] = (...args) => dispatch(actionCreator(...args));
    }
    return actionDispatchers;
  }, {});

export function createType(base) {
  let _base = base;
  if (Array.isArray(_base)) {
    _base = _base.join('/');
  }
  return _base;
}

export function action(type, payload = {}) {
  return { type, ...payload };
}

/**
 * 비동기 액션 요청 타입 생성
 * @param base
 * @returns {{ FETCH: FETCH_${_base}, SUCCESS: SUCCESS_${_base}, FAILURE: FAILURE_${_base} }}
 */
export function createRequestTypes(base) {
  let _base = base;
  if (Array.isArray(_base)) {
    _base = _base.join('/');
  }
  const res = {};
  [FETCH, SUCCESS, FAILURE]
  .forEach(type => res[type] = `${type}_${_base}`);
  return res;
}

export function patch(type, patch = {}, mergeKeys) {
  const rt = { type, patch };
  if (mergeKeys) {
    rt.mergeKeys = Array.isArray(mergeKeys) ? mergeKeys : [mergeKeys];
  }
  return rt;
}
