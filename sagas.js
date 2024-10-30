import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_DATA_REQUEST, fetchDataSuccess, fetchDataFailure,
  CREATE_DATA_REQUEST, createDataSuccess, createDataFailure,
  UPDATE_DATA_REQUEST, updateDataSuccess, updateDataFailure,
  DELETE_DATA_REQUEST, deleteDataSuccess, deleteDataFailure
} from './actions';

function* fetchDataSaga() {
  try {
    const response = yield call(axios.get, 'https://6713efea690bf212c76040f6.mockapi.io/Item');
    yield put(fetchDataSuccess(response.data));
  } catch (error) {
    yield put(fetchDataFailure(error.message));
  }
}

function* createDataSaga(action) {
  try {
    const response = yield call(axios.post, 'https://6713efea690bf212c76040f6.mockapi.io/Item', action.payload);
    yield put(createDataSuccess(response.data));
  } catch (error) {
    yield put(createDataFailure(error.message));
  }
}

function* updateDataSaga(action) {
  try {
    const response = yield call(axios.put, `https://6713efea690bf212c76040f6.mockapi.io/Item/${action.payload.id}`, action.payload.data);
    yield put(updateDataSuccess(response.data));
  } catch (error) {
    yield put(updateDataFailure(error.message));
  }
}

function* deleteDataSaga(action) {
  try {
    yield call(axios.delete, `https://6713efea690bf212c76040f6.mockapi.io/Item${action.payload}`);
    yield put(deleteDataSuccess(action.payload));
  } catch (error) {
    yield put(deleteDataFailure(error.message));
  }
}

function* rootSaga() {
  yield takeEvery(FETCH_DATA_REQUEST, fetchDataSaga);
  yield takeEvery(CREATE_DATA_REQUEST, createDataSaga);
  yield takeEvery(UPDATE_DATA_REQUEST, updateDataSaga);
  yield takeEvery(DELETE_DATA_REQUEST, deleteDataSaga);
}

export default rootSaga;