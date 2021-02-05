import React from 'react';
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import classNames from 'classnames';
import { useDesign } from 'rx-drag/store/useDesign';
import { ModelProvider, useModelStore } from 'Base/ModelTree/ModelProvider';
import { RxNode } from 'rx-drag/models/RxNode';
import { IMeta } from 'Base/RXNode/IMeta';
import { useSetTableStore } from 'Components/OneToMany/useSetTableStore';
import {observer} from 'mobx-react';
import { ComponentRender } from 'Base/PageUtils/ComponentRender';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      position:'relative',
    },
    label:{
      position:'absolute',
      top:'0',
      left:'0'
    }
  }),
);

const LoopPanel = observer((props: {
  rxNode: RxNode<IMeta>,
  separator?:JSX.Element|string, 
  className?:string, 
  children?:any, 
  style?:any
}) => {
  const {rxNode, separator, className, children, ...rest} = props;
  const classes = useStyles();
  const {isDesigning} = useDesign();
  const modelStore =  useModelStore();
  
  const fieldStore = modelStore?.getChild(rxNode?.meta.field);
  //console.log(modelStore, fieldStore, rxNode?.meta.field);

  useSetTableStore(rxNode, 'LoopPannelRow');

  return (
    isDesigning
    ? <div
        className={ classNames(classes.root, className)} 
        {...rest}
      >
        <div className = {classes.label}>
          Field Loop:{rxNode?.meta.field}
        </div>
        {children}
      </div>
    : <>
        {
          fieldStore?.getChildren()?.map((rowStore, index) => (
            <ModelProvider value={rowStore} key = {rowStore.id}>
              {
                rowStore?.node?.children.map((child)=>{
                  return(
                    <ComponentRender key={`${child?.id}-${rowStore.id}`} node = {child} />
                  )
                })
              }
              {
                index !== fieldStore?.getChildren().length - 1 &&
                separator
              }
            </ModelProvider>
          ))
        }
      </>
  )
});

export default LoopPanel