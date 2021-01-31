
export interface IPropConfig {
  name: string;
  label?: string; 
  labelKey?: string;//存Label ID， 从资源文件读取
  propType?: 'longString'|'string'|'boolean'|'select'|'items'|'number'|'JSON',
  items?: Array<{value:string, label:string}>;
  props?: any;
  defaultValue?:any;
}
