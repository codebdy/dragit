import { IPageMutation } from "../Model/IPageMutation";

export const OPEN_PAGE_ACTION = "OPEN_PAGE_ACTION";
export const GO_BACK_ACTION = "GO_BACK_ACTION";
export const GET_DATA_ACTION = "GET_DATA_ACTION";
export const RESET_ACTION = "RESET_ACTION";
export const SUBMIT_MUTATION = "SUBMIT_MUTATION";

export const DELETE_LIST_VIEW_RECORD = "DELETE_LIST_VIEW_RECORD";
export const UPDATE_LIST_VIEW_RECORD = "UPDATE_LIST_VIEW_RECORD";
export const BATCH_DELETE_LIST_VIEW_RECORDS = "BATCH_DELETE_LIST_VIEW_RECORDS";
export const BATCH_UPDATE_LIST_VIEW_RECORDS = "BATCH_UPDATE_LIST_VIEW_RECORDS";

export interface PageAction{
  name:string;
  mutation?:IPageMutation;
  resetNodes?:string[];
  [key:string]: any;
}

export interface PageActionHandle{
  (formAction:PageAction): void;
}