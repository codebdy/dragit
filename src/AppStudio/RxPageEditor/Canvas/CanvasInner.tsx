import React from 'react';
import { makeStyles, Theme, createStyles, Container} from "@material-ui/core";
import classNames from 'classnames';
import {observer} from 'mobx-react';
import { useAppStudioStore } from 'AppStudio/AppStudioStore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    canvas:{
      flex:1,
      display:'flex',
      flexFlow: 'column',
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
    },

    editPadding:{
      paddingTop: '2px',
      paddingBottom: theme.spacing(5),
    },
  }),
);

const CanvasInner = observer((props: {
    children?:any
  }) => {
  const classes = useStyles();
  const studioStore = useAppStudioStore();
  let maxWidth = studioStore?.pageEditor?.currentData?.maxWidth;
  maxWidth = maxWidth === '' || maxWidth === undefined ? 'lg' : maxWidth;
  let width:any = studioStore?.pageEditor?.currentData?.width
  width = width  ? width + 'px' : '';
  return (
    <Container
      maxWidth = {maxWidth==='false'? false : maxWidth as any}
      style={{
        width:width
      }}
      {...props}
      className={ classNames(classes.canvas, classes.editPadding) }
    >
      {props.children}
      {!props.children && <span></span>}
    </Container>
  )
});

export default CanvasInner