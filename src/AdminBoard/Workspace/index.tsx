import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import classNames from "classnames";
import { PageEditor } from "design/PageEditor";
import {observer} from 'mobx-react-lite';
import { useDesigner } from "store/helpers/useAppStore";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageContent: {
      flex: '1',
      //padding:'20px',
      display:'flex',
      flexFlow:'column',
    },

  }),
);

export const Workspace = observer((props:{children?: any})=>{
  const {children} = props;
  const classes = useStyles();
  //const designer = useDesigner();
  
  //const handleDesignerClose = ()=>{
  //  designer.close();
  //}

  return (
    <div className = {classNames( 
        classes.pageContent,
      )}
      //style={{padding: (spacing*4) + 'px'}}
    >
      {
        //designer.opened ?
        //  <PageEditor pageSlug = {designer.pageSlug} onClose = {handleDesignerClose}></PageEditor>
        //:
          children
      }
    </div>
  )
})