import { Badge, ListItem, ListItemIcon, ListItemText, Chip, createStyles, makeStyles, Theme } from "@material-ui/core";
import { useAppValue } from "Base/Hooks/useAppValue";
import IMenuItem from "Base/Model/IMenuItem";
import { RxNode } from "rx-drag/models/RxNode";
import classNames from "classnames";
import React from "react";
import { fade } from '@material-ui/core/styles/colorManipulator';
import { observer } from 'mobx-react';
import MdiIcon from "Components/Common/MdiIcon";
import { useLeftDrawer } from "Store/Helpers/useDragItStore";
import { useHistory, useRouteMatch } from "react-router";
import { useAppBoardStore } from "AppBoard/store/AppBoardStore";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemText: {
      fontSize:"1.1rem",
    },
    
    listItem:{
      paddingTop: theme.spacing(1.4),
      paddingBottom: theme.spacing(1.4),
      marginTop: theme.spacing(0.2),
      marginBottom: theme.spacing(0.2),
      paddingLeft: '23px',
      transition: 'all 0.3s',
      fontSize:"1.05rem",
      color: theme.palette.text.primary,
      "&:hover": {
        backgroundColor: fade(theme.palette.primary.main, 0.3),
      }
    },

    itemLink: {
      textDecoration: "none",
    },

    activeItem: {
      background: fade(theme.palette.primary.main, 0.2),
      "&:hover,&:focus": {
        backgroundColor: fade(theme.palette.primary.main, 0.3),
      }
    },

    itemIcon:{
      minWidth:'48px',
    },
    
  }),
);

export const MenuNode = observer((
  props:{
    nested?:boolean,
    node:RxNode<IMenuItem>,
    mini:boolean,
    onClick?: ()=>void,
    children?: any,
    dotBadge?:any,
    className?:string,
  }
)=>{
  const classes = useStyles();
  const {node, mini, dotBadge, className, children, onClick} = props;
  const item = node.meta;
  const {badge, chip, title, icon} = item;
  const baggeLabel = useAppValue(badge?.field);
  const leftDrawer = useLeftDrawer();
  const history = useHistory();
  const match = useRouteMatch();
  const{pageId} = match.params as any;
  const appBoardStore = useAppBoardStore(); 
  const handleClick = ()=>{
    if(item.pageId){
      history.push(`/app/${appBoardStore?.rxApp?.id}/${item.pageId}/`)
      leftDrawer.closeOnMobile();
    }else{
      onClick && onClick();      
    }
  }

  let iconTsx = (badge ? 
      <Badge 
        color={badge.color} 
        badgeContent={baggeLabel} 
        invisible={!mini || !baggeLabel}
      >
        <MdiIcon iconClass = {icon} />
      </Badge>
      :
      <MdiIcon iconClass = {icon} />
    )
  if(dotBadge){
    iconTsx = (<Badge 
      color={dotBadge.color} 
      variant="dot"
      invisible={!baggeLabel}
    >
      <MdiIcon iconClass = {icon} />
    </Badge>)
  }

  const text = <span className={classes.itemText}>{title}</span>;
 
  const selected = !!pageId && pageId === item.pageId;

  return (
    <ListItem 
      button 
      className = {classNames(classes.listItem, className, {[classes.activeItem]:selected})}
      onClick = {handleClick}
      selected = {selected}
    >
        {item.icon && <ListItemIcon className = {classes.itemIcon}>
          { iconTsx }
        </ListItemIcon>
        }
        <ListItemText primary={text} >
        </ListItemText>
        {(badge && baggeLabel && !mini) &&
          <Chip color={badge.color} label={baggeLabel} size={badge.size}/>          
        }
        {chip&&
          <Chip color={chip.color} label={chip.label} size={chip.size}/>          
        }
        {children}      
    </ListItem>
  )

})
