import React from 'react';
import { makeStyles, Theme, createStyles, ExpansionPanel } from '@material-ui/core';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import classNames from 'classnames';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    },
    panelPaper:{
      background:'transparent',
    },
    pannelDetail:{
      display:'flex',
      flexFlow:'column',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    attrRow:{
      display:'flex',
      flexFlow:'row',
    },
    rowLabel:{
      color:'#a8afb2',
      padding: theme.spacing(1,0),
      display:'flex',
      alignItems:'center',
      minWidth:'80px',
      cursor:'default',
    },

    nested:{
      paddingLeft:theme.spacing(2),
    },
    rowArrow:{
      color:'#e0e0e0',
    },
    rowValue:{
      display:'flex',
      alignItems:'center',    
    },
  }),
);

export default function AttributeBox(){
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ExpansionPanel className={classes.panelPaper}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>外观</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.pannelDetail}>
          <div className={classes.attrRow}>
            <div className={classes.rowLabel}>
              外边距 <ArrowRightIcon className={classes.rowArrow}/>
            </div>
            <div className={classes.rowValue}>
              value
            </div>
          </div>
          <div className={classes.attrRow}>
            <div className={classNames(classes.rowLabel, classes.nested)}>
              上
            </div>
            <div className={classes.rowValue}>
              value
            </div>
          </div>
          <div className={classes.attrRow}>
            <div className={classNames(classes.rowLabel, classes.nested)}>
              下
            </div>
            <div className={classes.rowValue}>
              value
            </div>
          </div>
          <div className={classes.attrRow}>
            <div className={classNames(classes.rowLabel, classes.nested)}>
              左
            </div>
            <div className={classes.rowValue}>
              value
            </div>
          </div>
          <div className={classes.attrRow}>
            <div className={classNames(classes.rowLabel, classes.nested)}>
              右
            </div>
            <div className={classes.rowValue}>
              value
            </div>
          </div>
          <div>内边距</div>
          <div>宽度</div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel  className={classes.panelPaper}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}>数据</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div>绑定字段</div>
        
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}