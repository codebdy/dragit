import React, { Fragment } from "react";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import classNames from "classnames";
import Badge from '@material-ui/core/Badge';
import Chip from '@material-ui/core/Chip';
import FontIcon from "components/common/MdiIcon"
import { API_GET_DRAWER } from "APIs/drawer";
import { useAxios } from "base/Hooks/useAxios";
import IMenuItem from "base/IMenuItem";
import { Divider } from "@material-ui/core";
import Scrollbar from "admin/common/Scrollbar";
import { TreeView } from "@material-ui/lab";
import { getBadge } from "admin/Sidebar/MenuItems/MenuNodeGroup";

export const openBackground = "rgba(255,255,255, 0.05)";
export const openBackgroundLight = "rgba(0,0,0, 0.05)";
export const activeBackground = "rgba(255,255,255, 0.2)";
export const activeBackgroundLight = "rgba(0,0,0, 0.2)";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    subHeader:{
      display:'flex',
      justifyContent:'start',
      letterSpacing:'0.05rem',
      paddingLeft: '26px',
      fontSize:"1.05rem",
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


    itemText: {
      fontSize:"1.1rem",
      userSelect:"none",
      cursor:'defalut',
    },
  
    nested: {
      paddingLeft: theme.spacing(4),
    },

    nestedList:{
      transition:'all 0.3s',
    },

    indicator:{
      transition:"all 0.3s",
    },

    opened:{
      transform:'rotate(90deg)',
    },

    itemOpened:{
      background: theme.palette.type === 'dark' ? openBackground : openBackgroundLight,
      "&:hover,&:focus": {
        backgroundColor:  theme.palette.type === 'dark' ? openBackground : openBackgroundLight,
      }
    },


    itemIcon:{
      minWidth:'48px',
    },

    scrollable:{
      flex:1,
      overflowY: 'auto',
      position: 'relative',
    },
  }),
);


interface ListItemProps{
  nested?:boolean,
  item:IMenuItem,
}

interface ItemProps extends ListItemProps{
  onClick?: ()=>void,
  children?: any,
  dotBadge?:any,
  className?:string,
}

interface GroupProps extends ListItemProps{
  openedId?: number,
  onOpened: (id:number)=>void,
}

function Subheader(props:ListItemProps){
  const classes = useStyles();
  return (
    <Fragment>
      <ListSubheader component="div"
        disableSticky
        className = {classes.subHeader}
      >
          {props.item.title}
      </ListSubheader>
    </Fragment>
  )
}

function Item(props:ItemProps){
  const classes = useStyles();
  const {item, dotBadge, className, children, onClick} = props
  const {badge, chip, title, icon} = item
  let iconTsx =  <FontIcon iconClass = {icon} />
  if(dotBadge){
    iconTsx = (<Badge 
      color={dotBadge.props.color} 
      variant="dot"
      invisible={!dotBadge.props.label}
    >
      <FontIcon iconClass = {icon} />
    </Badge>)
  }

  const text = <span className={classes.itemText}>{title}</span>;
  
  return (
    <ListItem 
      className = {classNames(classes.listItem, className)}
      onClick = {onClick}
    >
        {item.icon && <ListItemIcon className = {classes.itemIcon}>
          { iconTsx }
        </ListItemIcon>
        }
        <ListItemText primary={text} >
        </ListItemText>
        {(badge && badge.props.label) &&
          <Chip {... badge.props} />          
        }
        {chip&&
          <Chip {... chip.props}/>          
        }
        {children}      
    </ListItem>
  )

}

function Group(props:GroupProps){
  const open = props.openedId === props.item.id
  const [openedId, setOpenedId] = React.useState(-1);
  const handleOpened = (id:number)=>{
    setOpenedId(id)
  }

  const handleClick = () => {
    open ? props.onOpened(-1) : props.onOpened(props.item.id)
  };
  const classes = useStyles();
  const dotBadge = getBadge(props.item.children)

  const listItems = props.item.children?.map((item:IMenuItem)=>{
    return (
    <Fragment key={item.id}>
      {
        item.type === 'subheader' && <Subheader nested item={item} />
      }
      {item.type === 'item' && <Item nested item={item}/> }
      {item.type === 'group' && <Group nested item={item} onOpened={handleOpened} openedId={openedId}/>}
      {item.type === 'divider' && <Divider />}
    </Fragment>
    )
  })
  return (
    <Fragment>
      <Item 
        className={open ? classes.itemOpened :''} 
        item={props.item} dotBadge={!open && dotBadge} 
        onClick={handleClick}
      >
        <ChevronRightIcon className={
            classNames(classes.indicator, {[classes.opened] : open}) 
          } 
        />
      </Item>
      <Collapse in={props.openedId === props.item.id} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className={classes.nested}>
          {listItems}
        </List>
      </Collapse>
    </Fragment>
  )  
}

export default function DrawerItemList(props : {items?:Array<IMenuItem>}) {
  const classes = useStyles();
  const [openedId, setOpenedId] = React.useState(-1);
  const [items] = useAxios<Array<IMenuItem>>(API_GET_DRAWER);
  
  const handleOpened = (id:number)=>{
    setOpenedId(id)
  }

  const listItems = items?.map((item:IMenuItem)=>{
    return (
    <Fragment key={item.id}>
      {
        item.type === 'subheader' && <Subheader item={item} />
      }
      {item.type === 'item' && <Item item={item}/>}
      {item.type === 'group' && <Group  item={item} onOpened={handleOpened} openedId={openedId}/>}
      {item.type === 'divider' && <Divider />}
    </Fragment>
    )
  })

  return (
    <Scrollbar>
      <TreeView
        className={classes.root}
      >
        { listItems}

      </TreeView>
    </Scrollbar>
  );
}