import * as React from 'react';
import { Grid, IconButton } from '@material-ui/core';
import MdiIcon from 'Components/common/MdiIcon';
import { stringValue } from 'rx-drag/utils/stringValue';
import AttributeBoxActionSection from './AttributeBoxActionSection';
import intl from 'react-intl-universal';
import { useEffect, useState } from 'react';
import { IPageAction } from 'Base/Model/IPageAction';
import StringInput from './PropsInputs/StringInput';

export const AttributeBoxMultiActionSection = (
  props:{
    actions?:Object,
    onChange?:(actions?:Object)=>void
  }
) => {
  const {actions, onChange} = props;
  const [actionList, setActionList] = useState<Array<{name:string, action?:IPageAction}>>();

  useEffect(()=>{
    const newActionList = new Array<{name:string, action:IPageAction}>();
    Object.keys(actions||{}).forEach(key=>{
      newActionList.push(
        {
          name:key,
          action:(actions as any)[key],
        }
      )        
    })
    setActionList(newActionList);
  },[actions])

  const listToObj = (actionsList:Array<{name:string, action?:IPageAction}>)=>{
    const actionsObj = {} as any;
    actionsList?.map(action=>{
      actionsObj[action.name] = action.action;
    })
    return actionsObj;
  }

  const handleAdd = ()=>{
    const newActionList = [...actionList||[], {name:'action-name', action:{} as any}];
    setActionList(newActionList)
    onChange&&onChange(listToObj(newActionList))
  }

  const handleRemove = (index:number)=>{
    const newActionList = [...actionList||[]];
    newActionList.splice(index, 1);
    setActionList(newActionList)
    onChange&&onChange(listToObj(newActionList))
  }

  const handeChangeName = (index:number, name:string)=>{
    if(actionList){
      actionList[index].name = name;
      setActionList([...actionList]);
      onChange&&onChange(listToObj(actionList))     
    }
  }

  const handleChangeAction= (index:number, action?:IPageAction)=>{
    if(actionList){
      actionList[index].action = action;
      setActionList([...actionList]);
      onChange&&onChange(listToObj(actionList))     
    }
  }

  return (
    <>
      <Grid item container spacing = {2} justify = "space-between">
        {
           actionList?.map((actionObj,index)=>{
             return (
              <React.Fragment key = { index }>
                <StringInput
                  autoFocus
                  label = {intl.get('name')}
                  value = {stringValue(actionObj.name)}
                  onChange = {(value)=>handeChangeName(index, value as string)}
                  xs = {9}
                />
                 
                <Grid>
                  <IconButton
                    onClick = {()=>handleRemove(index)}
                  >
                    <MdiIcon iconClass = "mdi-close"  size = {20}/>
                  </IconButton>
                 </Grid>
                 <AttributeBoxActionSection 
                  action = {actionObj.action} 
                  onChange = {action=>handleChangeAction(index, action)}
                />
               </React.Fragment>
            )
          })
        }
      </Grid>                 
      
      <Grid item container xs = {12} justify = "center">
          <IconButton
            onClick = {handleAdd}
          >
            <MdiIcon iconClass = "mdi-plus"  size = {20}/>
          </IconButton>
      </Grid>
    </>
  );
}
