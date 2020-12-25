
import { IColumn } from '../IColumn';
import { mediaFieldGQL } from './mediaFieldGQL';
import {EnumChipRender} from './EnumChipRender'
import { DefaultRender } from './DefaultRender';
import {MediaRender} from './MediaRender'
var rendersMap : { 
  [key: string]: any
} = {
  EnumChipRender,
  MediaRender
}

var renderGQLFnsMap:{
  [key: string]: (column:IColumn) => string,
}
={
  MediaRender:mediaFieldGQL,
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
