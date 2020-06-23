import React, { useRef } from 'react';
import { makeStyles, Theme, createStyles, Paper, Typography, Divider } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import classNames from 'classnames';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    portlet: {
      flex:1,
    },

    header:{
      padding:theme.spacing(2),
      display: 'flex',
      flexFlow: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    indicator:{
      transition:"all 0.3s",
      cursor:'pointer',
    },

    opened:{
      transform:'rotate(90deg)',
    },

    body:{
      transition:'all 0.3s',
      overflow:'hidden',
    },

    bodyClose:{
      height:'0px',
    },
    bodyInner:{
      padding:theme.spacing(2),
    }

  }),
);

const Portlet = React.forwardRef((props: {children?:any, open:boolean}, ref:any) => {
  const classes = useStyles();
  const {open, ...rest} = props;
  const [opened, setOpened] = React.useState(open);

  const hendleClickChevronIcon = ()=>{
    setOpened(!opened)
  }

  const bodyInnerRef = useRef(null);

  const height = bodyInnerRef?.current ? (bodyInnerRef?.current as any).getBoundingClientRect().height + 'px': '';

  return (
    <Paper
      ref={ref}
      {...rest}
      className = {classes.portlet}
    >
      <div>
        <div className = {classes.header}>
          <Typography variant="h5">
            基本信息
          </Typography>
          <ChevronRightIcon 
            className={
              classNames(classes.indicator,  {[classes.opened] : opened})
            } 
            onClick ={hendleClickChevronIcon} 
          />
        </div>
        <Divider></Divider>
      </div>
      <div className ={classNames(classes.body,  {[classes.bodyClose] : !opened})}
        style ={{
          height: opened? height : '0px'
        }}
      >
        <div ref={bodyInnerRef} className={classes.bodyInner}>
          xxx
        {props.children}
        </div>
      </div>
    </Paper>
  )
});

export default Portlet;