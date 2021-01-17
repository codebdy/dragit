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

    return ` ${meta.field} `;
  }

  return '';
}