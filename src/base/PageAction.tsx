import { IPageMutation } from "./Model/IPageMutation";

export const OPEN_PAGE_ACTION = "OPEN_PAGE_ACTION";
export const GO_BACK_ACTION = "GO_BACK_ACTION";
export const GET_DATA_ACTION = "GET_DATA_ACTION";
export const RESET_ACTION = "RESET_ACTION";
export const SUBMIT_MUTATION = "SUBMIT_MUTATION";
//export const PAGE_ACTION = "PAGE_ACTION";

export interface PageAction{
  name:string;
  mutation?:IPageMutation;
  [key:string]: any;
}

export interface PageActionHandle{
  (formAction:PageAction): void;
}