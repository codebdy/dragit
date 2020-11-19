import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import classNames from "classnames";
import PageEditor from "designer/PageEditor";
import useDesigner from "store/designer/useDesigner";
import { cancelPageContentAction } from "store/designer/actions";
import { openFixedBarAction } from "store/fixedBar/actions";
import { useDispatch } from "react-redux";

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

export default function PageContent(props:{children?: any}) {
  const {children} = props;
  const classes = useStyles();
  const designer = useDesigner();
  const dispatch = useDispatch();
  
  const handleDesignerClose = ()=>{
    dispatch(cancelPageContentAction());
    dispatch(openFixedBarAction());
  }

  return (
    <div className = {classNames( 
        classes.pageContent,
      )}
      //style={{padding: (spacing*4) + 'px'}}
    >
      {
        designer.opened ?
          <PageEditor pageJson = {designer.pageJson} onClose = {handleDesignerClose}></PageEditor>
        :
          children
      }
    </div>
  )
}