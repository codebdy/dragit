
export interface IPropConfig {
  name: string;
  label?: string; 
  labelKey?: string;//存Label ID， 从资源文件读取
  propType?: 'string'|'boolean'|'select'|'items'|'number'|'JSON'|'mutation',
  items?: Array<{value:string, label:string}>;
  props?: any;
  isMeta?: boolean;
  defaultValue?:any;
}
