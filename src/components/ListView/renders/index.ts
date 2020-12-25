
import { IColumn } from '../IColumn';
import { mediaFieldGQL } from './mediaFieldGQL';
import {EnumChipRender} from './EnumChipRender'
import { DefaultRender } from './DefaultRender';
var rendersMap : { 
  [key: string]: any
} = {
  EnumChip: EnumChipRender
}

var renderGQLFnsMap:{
  [key: string]: (column:IColumn) => string,
}
={
  Image:mediaFieldGQL,
}

export function resolveCellRender(column: IColumn){
  const defaultRender = DefaultRender;
  if(!column.render){
    return defaultRender;
  }
  const name = column.render?.name;
  return  rendersMap[name] || defaultRender;
}

export function resolveFieldGQL(column: IColumn){
  if(column.render){
    const gqlFn = renderGQLFnsMap[column.render?.name];
    if(gqlFn){
      return gqlFn(column);
    }   
  }

  return ` ${column.field} `;
}
