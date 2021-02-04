import { IMeta } from "Base/RXNode/IMeta";
import { RxNode } from "rx-drag/models/RxNode";

const CHILDREN_GQL = "#{children}";
function getMetaFieldGql(meta?: IMeta){
  //根节点
  if(!meta){
    return `{ id ${CHILDREN_GQL} }`;
  }

  if(meta.fieldsGql){
    return ` ${meta.fieldsGql} `;
  }


  if(meta.field){
    if( meta.name === 'FormGridContainer'||
        meta.name === 'OneToManyPortlet'||
        meta.name === 'OneToManyTable'
    ){
      return `  ${meta.field}{ id ${CHILDREN_GQL} }`;
    }

    if(meta.name === 'MediasPortlet' 
    || meta.name === 'MediaSelect' 
    || meta.name === 'MediaView' 
    || meta.name === 'MediaGroup'){
      return `  ${meta.field}{ id title  thumbnail  src  alt }`;
    }

    if(meta.name === 'TreeSelect'){
      return `  ${meta.field}{ id }`;
    }

    if(meta.name === 'MultiSelectBox' || meta.name === 'SingleSelectBox'){
      return `  ${meta.field}{ ${meta.props?.itemKey || 'id'} }`;
    }

    if(meta.name === 'LoopPanel'){
      return `  ${meta.field}{ id ${CHILDREN_GQL} }`;
    }

    return ` ${meta.field} `;
  }

  if(meta.name === 'ListView'){
    return `{ id ${CHILDREN_GQL} }`;
  }

  return '';
}

export function getNodeGraphQL(node?: RxNode<IMeta>) {
  if(!node){
    return '';
  }

  //console.log('getNodeGraphQL', node?.meta.name , node)
  
  let gql = ` ${getMetaFieldGql(node.meta)} `;

  let childrenGql = '';
  node.children.forEach(child => {
    childrenGql = childrenGql + getNodeGraphQL(child);
  });

  gql = gql.trim() ? gql.replace(CHILDREN_GQL, childrenGql) : childrenGql;

  return gql;
}
