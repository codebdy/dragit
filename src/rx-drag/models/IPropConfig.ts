
export interface IPropConfig {
  name: string;
  label?: string; 
  labelKey?: string;//存Label ID， 从资源文件读取
  input?: any;
  propType?: 'string'|'boolean'|'select'|'items'|'number',
  items?: Array<{value:string, label:string}>;
  props?: any;
  defaultValue?:any;
}
