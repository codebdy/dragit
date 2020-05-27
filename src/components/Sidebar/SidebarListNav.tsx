import React from "react";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import StarBorder from '@material-ui/icons/StarBorder';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import classNames from "classnames";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      //backgroundColor: theme.palette.background.paper,
    },
    subHeader:{
      display:'flex',
      justifyContent:'start',
      letterSpacing:'0.05rem',
    },
    listItem:{
      paddingTop: theme.spacing(1.5),
      paddingBottom: theme.spacing(1.5),
    },

    nested: {
      paddingLeft: theme.spacing(4),
    },

    indicator:{
      transition:"all 0.3s",
    },

    opend:{
      transform:'rotate(90deg)',
    }
  }),
);

export default function ListNav() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      className={classes.root}
    >
      <ListSubheader component="div"
        className = {classes.subHeader}
      >
          Nested List Items
        </ListSubheader>
      <ListItem button className = {classes.listItem}>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary='仪表盘'>
          
        </ListItemText>
      </ListItem>
      <ListItem button className = {classes.listItem}>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary='Draft' />
      </ListItem>
      <ListItem button className = {classes.listItem} onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
         <ChevronRightIcon className={
              classNames(classes.indicator, {[classes.opend] : open}) 
            } 
         />
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred1" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred2" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred3" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred4" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred5" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred6" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred7" />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}