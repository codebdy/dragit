
export interface IValidateRule {
  required?: boolean;
  valueType?: string;
  ruleType?: string;
  maxLength?: number;
  minLength?: number;
  max?: number | string;
  min?: number | string;
  pattern?: string;
  errorMessage?: string;
  [key: string]: any;
}
