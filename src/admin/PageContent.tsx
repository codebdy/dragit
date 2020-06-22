import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import classNames from "classnames";
import { RootState } from "store";
import { useSelector } from "react-redux";

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

export default function PageContent(props:{spacing?:number, children?: any}) {
  const {/*spacing = 5,*/ children} = props;
  const classes = useStyles();
  const selectMyStore = (state: RootState) => state.designer
  const myStore = useSelector(selectMyStore)  
    return (
    <div className = {classNames( 
        classes.pageContent,
      )}
      //style={{padding: (spacing*4) + 'px'}}
    >
      { !myStore.pageContentDesign && children}
    </div>
  )
}