import React from 'react';
import { makeStyles, Theme, createStyles, ExpansionPanel } from '@material-ui/core';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    },
    panelPaper:{
      background:'transparent',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
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
        <ExpansionPanelDetails>
          <div><div>外边距</div>
        <div>内边距</div></div>
        
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
      </ExpansionPanel>
    </div>
  )
}