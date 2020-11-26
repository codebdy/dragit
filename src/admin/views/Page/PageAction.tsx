
export const JUMP_TO_PAGE_ACTION = "JUMP_TO_PAGE_ACTION";
export const GO_BACK_ACTION = "GO_BACK_ACTION";
export const GET_DATA_ACTION = "GET_DATA_ACTION";
export const POST_DATA_ACTION = "POST_DATA_ACTION";
//export const PAGE_ACTION = "PAGE_ACTION";

export interface PageAction{
  name:string;
  [key:string]: any;
}

export interface PageActionHandle{
  (formAction:PageAction): void;
}