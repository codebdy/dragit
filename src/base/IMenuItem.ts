
export interface IMenuBage {
  color?: 'primary' | 'secondary' | 'default';
  field?: string;
  size?: 'small' | 'medium';
}

export interface IMenuChip {
  color?: 'primary' | 'secondary' | 'default';
  label?: string;
  size?: 'small' | 'medium';
}

export default interface IMenuItem{
  id: number,
  type: "group" | "subheader" | "divider" | "item",
  title?:string,
  icon?:string,
  badge?:IMenuBage,
  chip?:IMenuChip,
  children: Array<IMenuItem>,
  to?: string,
  [key:string]:any,
}