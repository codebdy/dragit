import { IMeta } from "Base/Model/IMeta";

export const CHILDREN_GQL = "#{children}";

export function getMetaFieldGql(meta: IMeta){

  if(meta.field){
    if(meta.name === 'FormGridContainer'){
      return `  ${meta.field}{ ${CHILDREN_GQL} }`;
    }

    if(meta.name === 'MediasPortlet'){
      return `  ${meta.field}{ id title  thumbnail  src  alt }`;
    }

    if(meta.name === 'TreeSelect'){
      return `  ${meta.field}{ id ${meta.props?.nameKey || 'name'} }`;
    }

    if(meta.name === 'MultiSelectBox' || meta.name === 'SelectBox'){
      return `  ${meta.field}{ ${meta.props?.itemKey || 'id'} ${meta.props?.itemName || 'name'} }`;
    }

    return ` ${meta.field} `;
  }

  return '';
}