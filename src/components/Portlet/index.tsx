import React, { useRef, Fragment } from 'react';
import { makeStyles, Theme, createStyles, Typography, Divider, IconButton, Paper, Collapse } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import classNames from 'classnames';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

  }),
);

interface PortletProps{
  withHeader?:boolean;
  children?:any;
  open?:boolean;
  title?:string;
  collapsible?:boolean;
  className?:any;
  actions?:any;
}

const Portlet = React.forwardRef((props: PortletProps, ref:any) => {
  const classes = useStyles();
  const {open,withHeader, children, title, collapsible, className, actions, ...rest} = props;
  const [opened, setOpened] = React.useState(open);

  const hendleClickChevronIcon = ()=>{
    setOpened(!opened)
  }

  const bodyInnerRef = useRef(null);

  //以前用height，用maxHeight解决页面迁移时，高度计算不准的bug
  //let maxHeight = bodyInnerRef?.current ? (bodyInnerRef?.current as any).getBoundingClientRect().height + 500 + 'px': '';

  //maxHeight = collapsible ? (opened ? maxHeight : '0px') : 'auto';

  return (
    <Paper
      ref={ref}
      {...rest}
      className = {className}
    >
      {withHeader && 
        <Fragment>
          <div className = {classes.header}>
            <Typography variant="h5">
              {title}
            </Typography>
            <div>
              {actions}
              {
                collapsible &&
                <IconButton onClick ={hendleClickChevronIcon} style={{zIndex:0}} size="small" >              
                  <ChevronRightIcon 
                    className={
                      classNames(classes.indicator,  {[classes.opened] : opened})
                    } 
                  />
                </IconButton>
              }
            </div>
          </div>
          <Divider></Divider>
        </Fragment>
      }
      <Collapse in={opened} timeout="auto" unmountOnExit>
        <div ref={bodyInnerRef}>
          {children}
        </div>
      </Collapse>
    </Paper>
  )
});

export default Portlet;
