import React from 'react';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import {
  call,
  fork,
  take,
  select,
  put,
  cancel,
  takeLatest
} from 'redux-saga/effects';
import {
  ADD_COMMENT_SUCCESS,
  ADD_READY_COMMENT,
  FETCH_COMMENT_ERROR,
  FETCH_COMMENT_SUCCESS,
  FETCH_READY_COMMENT
} from './actions';
import { addComment, fetchComment } from './sagas';
import agent from '../../../agent';

describe('CommentSagas ', () => {
  it('should success fetchComment', () => {
    const param = { detailId: 1 };
    const gen = fetchComment(param);
    const response = {
      comments: [],
      commentchild: []
    };
    expect(gen.next().value).to.deep.equal(put({ type: FETCH_READY_COMMENT }));
    expect(gen.next().value).to.deep.equal(call(agent.Comment.byDetailId, param.detailId));
    expect(gen.next(response).value).to.deep.equal(put({
      type: FETCH_COMMENT_SUCCESS,
      comments: [],
      commentchild: []
    }));
    expect(gen.next().done).to.equal(true);
  });

  it('should failure fetchComment', () => {
    const param = { detailId: 1 };
    const gen = fetchComment(param);
    const response = {
      comments: [],
      commentchild: []
    };
    expect(gen.next().value).to.deep.equal(put({ type: FETCH_READY_COMMENT }));
    expect(gen.next().value).to.deep.equal(call(agent.Comment.byDetailId, param.detailId));
    expect(gen.throw({ message: 'hello' }).value).to.deep.equal(put({
      type: FETCH_COMMENT_ERROR,
      message: 'hello'
    }));
    expect(gen.next().done).to.equal(true);
  });

  it('should success addComment', () => {
    const param = {
      commentId: 0,
      detailId: 1,
      userId: 1,
      userName: 'b',
      content: 'b'
    };
    const gen = addComment(param);
    const response = {
      comments: [],
      commentchild: []
    };

    expect(gen.next({
      tmpCommentId: 1
    }).value).to.deep.equal(put({
      type: ADD_READY_COMMENT,
      comment: {
        content: 'b',
        detailId: 1,
        id: Date.now().toString(),
        userId: 1,
        userName: 'b'
      },
      parentId: 0
    }));
    expect(gen.next().value).to.deep.equal(call(agent.Comment.postComment, param.detailId, param.content));
    expect(gen.next({ tmpCommentId: 1, res: { id: 2 } }).value).to.deep.equal(put({
      type: ADD_COMMENT_SUCCESS,
      parentId: param.commentId,
      id: 1,
      newId: 2
    }));
    expect(gen.next().done).to.equal(true);
  });
});
