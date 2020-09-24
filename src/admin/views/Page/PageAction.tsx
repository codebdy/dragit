
export const JUMP_TO_PAGE_ACTION = "JUMP_TO_PAGE_ACTION";
export const GO_BACK_ACTION = "GO_BACK_ACTION";
export const GET_DATA_ACTION = "GET_DATA_ACTION";
export const POST_DATA_ACTION = "POST_DATA_ACTION";

export interface PageJumper{
  moduleId:string,
  pageId:string,
  dataId?:string,
}

export interface PageAction{
  name:string;
  [key:string]: any;
}

export interface PageActionHandle{
  (formAction:PageAction): void;
}