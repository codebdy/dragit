import { IMeta } from "Base/Model/IMeta";
import { RXNode } from "Base/RXNode/RXNode";

const CHILDREN_GQL = "#{children}";
function getMetaFieldGql(meta?: IMeta){
  if(!meta){
    return '';
  }

  if(meta.graphiQL){
    return meta.graphiQL;
  }

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

  if(meta.name === 'ListView'){
    return `{ id ${CHILDREN_GQL} }`;
  }

  return '';
}

export function getNodeGraphQL(node?: RXNode<IMeta>) {
  if(!node){
    return '';
  }
  
  let gql = ` ${getMetaFieldGql(node.meta)} `;

  let childrenGql = '';
  node.children.forEach(child => {
    childrenGql = childrenGql + getNodeGraphQL(child);
  });

  gql = gql.trim() ? gql.replace(CHILDREN_GQL, childrenGql) : childrenGql;

  return gql;
}
