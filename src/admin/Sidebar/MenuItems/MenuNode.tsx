import { Badge, ListItem, ListItemIcon, ListItemText, Chip, createStyles, makeStyles, Theme } from "@material-ui/core";
import { useAppValue } from "base/Hooks/useAppValue";
import IMenuItem from "base/Model/IMenuItem";
import { RXNode } from "base/RXNode/RXNode";
import classNames from "classnames";
import MdiIcon from "components/common/MdiIcon";
import React from "react";
import { NavLink } from "react-router-dom";
import { fade } from '@material-ui/core/styles/colorManipulator';

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
    },

    itemLink: {
      textDecoration: "none",
    },

    activeItem: {
      width:'100%',
      height:'100%',
      display:'block',
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

function ItemTo(props: {to?:string, children:any}){
  const classes = useStyles();
  const handleClick = ()=>{
    console.log('ItemTo click')
  }
  return(
    props.to?
    <NavLink to={ props.to} activeClassName={ classes.activeItem}
      className={classes.itemLink}
      onClick = {handleClick}
    >
      {props.children}
    </NavLink>
    :
    props.children
  )
}


export default function MenuNode(
  props:{
    nested?:boolean,
    node:RXNode<IMenuItem>,
    mini:boolean,
    onClick?: ()=>void,
    children?: any,
    dotBadge?:any,
    className?:string,
  }
){
  const classes = useStyles();
  const {node, mini, dotBadge, className, children, onClick} = props;
  const item = node.meta;
  const {badge, chip, title, icon} = item;
  const baggeLabel = useAppValue(badge?.field);

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
 
  return (
    <ItemTo to={item.to}>
      <ListItem 
        button 
        className = {classNames(classes.listItem, className)}
        onClick = {onClick}
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
    </ItemTo>    
  )

}
