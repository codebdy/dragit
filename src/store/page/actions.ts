import { createAction } from 'redux-actions';

const loadingSchemaAction = createAction('LOADING_PAGE_SCHEMA');
const receivedSchemaAction = createAction('RECEIVED_PAGE_SCHEMA');
const requestSchemaFailureAction = createAction('REQUEST_PAGE_SCHEMA_FAILURE');

const loadingModelAction = createAction('LOADING_PAGE_DATA');
const receivedModelAction = createAction('RECEIVED_PAGE_DATA');
const requestModelFailureAction = createAction('REQUEST_PAGE_DATA_FAILURE');

export {
  loadingSchemaAction,
  receivedSchemaAction,
  requestSchemaFailureAction,
  loadingModelAction,
  receivedModelAction,
  requestModelFailureAction
};