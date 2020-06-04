import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FontIcon from 'components/common/FontIcon';
import intl from 'react-intl-universal';
import classNames from 'classnames';

const hoverBackground = "rgba(255,255,255, 0.1)";
const hoverBackgroundLight = "rgba(0,0,0, 0.2)";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      padding:theme.spacing(2),
      //backgroundColor: theme.palette.background.paper,
    },
    indicator:{
      transition:"all 0.3s",
    },

    opened:{
      transform:'rotate(90deg)',
    },
    
    component:{
      cursor: 'move',
      userSelect: 'none',
      "&:hover,&:focus": {
        backgroundColor: theme.palette.type === 'dark' ? hoverBackground : hoverBackgroundLight,
      }
    },
  }),
);

export default function Toolbox() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button>
        <ListItemIcon>
          <FontIcon iconClass="mdi mdi-view-dashboard"/>
        </ListItemIcon>
        <ListItemText primary={intl.get('grid')} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <FontIcon iconClass="mdi mdi-text-box"/>
        </ListItemIcon>
        <ListItemText primary={intl.get('form')} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <FontIcon iconClass="mdi mdi-relation-many-to-many"/>
        </ListItemIcon>
        <ListItemText primary={intl.get('relations')} />
      </ListItem>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <FontIcon iconClass="mdi mdi-puzzle"/>
        </ListItemIcon>
        <ListItemText primary={intl.get('customized')} />
        <ChevronRightIcon className={
            classNames(classes.indicator, {[classes.opened] : open}) 
          } 
        />
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem className={classes.component}>
            <ListItemIcon>
              
            </ListItemIcon>
            <ListItemText primary="1对多表" />
            <FontIcon iconClass="mdi mdi-arrow-all"/>
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}