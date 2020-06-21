
export const JUMP_TOP_PAGE_ACTION = "JUMP_TOP_PAGE_ACTION";

export interface FormAction{
  name:string;
  [key:string]: any;
}

export interface FormActionHandle{
  (formAction:FormAction): void;
}