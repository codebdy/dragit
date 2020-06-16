import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MdiIcon from 'components/common/MdiIcon';
import intl from 'react-intl-universal';
import classNames from 'classnames';
import items from './items'
import { RootState } from 'store';
import { useSelector } from 'react-redux';
import {sideBarSettings} from "utils";

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
      },
      paddingLeft:theme.spacing(6),
    },

    groupText:{
      letterSpacing: '1px',
    },
    itemText:{
      fontSize:"0.9rem",
      letterSpacing: '1px',
    },
  }),
);

interface ItemJson{
  id: string,
  titleKey?:string,
  title?:string,
  icon?:string,
  children?: Array<any>,
}

function Item(props:{item:ItemJson}){
  const{item} = props
  const classes = useStyles();
  const handleClick=()=>{
    
  }

  return (
    <ListItem className={classes.component} onClick={handleClick}>
      <ListItemText 
        primary={item.titleKey ? intl.get(item.titleKey) : item.title} 
        classes={{
            primary:classes.itemText
          }
        }
      >
      </ListItemText>
      <MdiIcon iconClass="mdi-arrow-all" size={20}/> 
    </ListItem>  
  )
}

function ItemGroup(props:{item:ItemJson, openedId:string, onToggleOpen: (id:string)=>void}){
  const{item, openedId, onToggleOpen} = props
  const classes = useStyles();
  const open = openedId === item.id;
  const handleClick = ()=>{
    onToggleOpen(item.id)
  };

  return (
    <Fragment>
      <ListItem button onClick= {handleClick}>
        <ListItemIcon>
          <MdiIcon iconClass={item.icon} size={22}/>
        </ListItemIcon>
        <ListItemText primary={item.titleKey ? intl.get(item.titleKey) : item.title} 
          classes={{
              primary:classes.groupText
            }
          }
        />
        <ChevronRightIcon className={
            classNames(classes.indicator, {[classes.opened] : open}) 
          } 
        />
      </ListItem>  
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            item.children && item.children.map((item:ItemJson)=>{
              return (
                <Item key={item.id} item={item} />
              )
            })
          }
        </List>
      </Collapse>

    </Fragment>
  )
}


export default function Toolbox() {
  const classes = useStyles();
  const [opened, setOpened] = React.useState('');
  const selectSidebar = (state: RootState) => state.sidebar
  const sidebar = useSelector(selectSidebar)  
  const fullWidth = sideBarSettings.sizes[sidebar.size]

  const handleToggleOpen = (id:string) => {
    setOpened(id === opened ? '' : id)
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
      style={{
        width: sidebar.compactable ? sideBarSettings.sizes['compact'] : fullWidth + 'px',
      }}
    >
      {
        items.map((item:ItemJson)=>{
          return (
            <ItemGroup key={item.id} openedId={opened} item={item} onToggleOpen={handleToggleOpen} />
          )
        })
      }
    </List>
  );
}