
export interface IMenuBadge {
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
  type: "group" | "subheader" | "divider" | "item",
  title?:string,
  icon?:string,
  badge?:IMenuBadge,
  chip?:IMenuChip,
  children?: Array<IMenuItem>,
  moduleSlug?: string,
  auths?:string[],
  [key:string]:any,
}