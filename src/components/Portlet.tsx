import React, { useRef, Fragment } from 'react';
import { makeStyles, Theme, createStyles, Paper, Typography, Divider, IconButton } from '@material-ui/core';
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
    },

    opened:{
      transform:'rotate(90deg)',
    },

    body:{
      transition:'all 0.3s',
    },

    bodyClose:{
      height:'0px',
      overflow:'hidden',
    },
    bodyInner:{
      //padding:theme.spacing(2),
    }

  }),
);

interface PortletProps{
  withHeader:boolean;
  children?:any;
  open?:boolean;
  title?:string;
  scalable?:boolean;
  className?:any;
  spacingTop?:number;
  spacingRight?:number;
  spacingBottom?:number;
  spacingLeft?:number;
}

const Portlet = React.forwardRef((props: PortletProps, ref:any) => {
  const classes = useStyles();
  const {open,withHeader, children, title, scalable, className, 
    spacingTop,
    spacingRight,
    spacingBottom,
    spacingLeft,
    ...rest} = props;
  const [opened, setOpened] = React.useState(open);

  const hendleClickChevronIcon = ()=>{
    setOpened(!opened)
  }

  const bodyInnerRef = useRef(null);

  let height = bodyInnerRef?.current ? (bodyInnerRef?.current as any).getBoundingClientRect().height + 'px': '';

  height = scalable ? (opened ? height : '0px') : 'auto';

  return (
    <Paper
      ref={ref}
      {...rest}
      className = { classNames(classes.portlet, className) }
    >
      {withHeader && 
        <Fragment>
          <div className = {classes.header}>
            <Typography variant="h5">
              {title}
            </Typography>
            {
              scalable &&
              <IconButton onClick ={hendleClickChevronIcon} >              
                <ChevronRightIcon 
                  className={
                    classNames(classes.indicator,  {[classes.opened] : opened})
                  } 
                />
              </IconButton>
            }
          </div>
          <Divider></Divider>
        </Fragment>
      }
      <div className ={classNames(classes.body,  {[classes.bodyClose] : !opened})}
        style ={{
          height: height
        }}
      >
        <div ref={bodyInnerRef} className={classes.bodyInner}>
          {children}
        </div>
      </div>
    </Paper>
  )
});

export default Portlet;