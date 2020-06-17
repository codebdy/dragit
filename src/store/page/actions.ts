import { createAction } from 'redux-actions';

const loadingSchemaAction = createAction('LOADING_PAGE_SCHEMA');
const receivedSchemaAction = createAction('RECEIVED_PAGE_SCHEMA');
const requestSchemaFailureAction = createAction('REQUEST_PAGE_SCHEMA_FAILURE');

const loadingDataAction = createAction('LOADING_PAGE_DATA');
const receivedDataAction = createAction('RECEIVED_PAGE_DATA');
const requestDataFailureAction = createAction('REQUEST_PAGE_DATA_FAILURE');

export {
  loadingSchemaAction,
  receivedSchemaAction,
  requestSchemaFailureAction,
  loadingDataAction,
  receivedDataAction,
  requestDataFailureAction
};