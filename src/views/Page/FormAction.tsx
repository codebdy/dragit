export interface FormAction{
  name:string;
}

export interface FormActionHandle{
  (formAction:FormAction): void;
}