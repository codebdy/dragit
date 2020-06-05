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
import Scrollbar from "../common/Scrollbar";
import Badge from '@material-ui/core/Badge';
import Chip from '@material-ui/core/Chip';
import { useSelector } from "react-redux";
import FontIcon from "components/common/MdiIcon"
import LoadingSkeleton from "./LoadingSkeleton";
import { NavLink } from "react-router-dom";

const whiteColor = '#fff';
const openBackground = "rgba(255,255,255, 0.05)";
const openBackgroundLight = "rgba(0,0,0, 0.05)";
const activeBackground = "rgba(255,255,255, 0.2)";
const activeBackgroundLight = "rgba(0,0,0, 0.2)";

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
    },
    listItem:{
      paddingTop: theme.spacing(1.4),
      paddingBottom: theme.spacing(1.4),
      marginTop: theme.spacing(0.2),
      marginBottom: theme.spacing(0.2),
      paddingLeft: '23px',
      transition: 'all 0.3s',
      //textDecoration: "none",
      color: whiteColor,
      //"&:hover,&:focus,&:visited,&:active": {
        //color: whiteColor,
        //textDecoration: "none",
      //}
    },
    itemLink: {
      textDecoration: "none",
    },

    activeItem: {
      width:'100%',
      height:'100%',
      display:'block',
      background: theme.palette.type === 'dark' ? activeBackground : activeBackgroundLight,
      "&:hover,&:focus": {
        backgroundColor: theme.palette.type === 'dark' ? activeBackground : activeBackgroundLight,
      }
    },

    //itemText: {
   //   textDecoration: "none",
    //},
  
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

    itemOpenedLight:{
      background:'rgba(0,0,0, 0.1)',
      "&:hover,&:focus": {
        backgroundColor: 'rgba(0,0,0, 0.1)',
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

interface ItemJson{
  id: string,
  type:'subheader' | 'item' | 'group',
  title?:string,
  icon?:string,
  badge?:{
    props:any
  },
  chip?:{
    props:any
  },
  children: Array<ItemJson>,
  to?: string,
}

interface RootState {
  menu:any,
}

interface SidebarLinksProps{
  fullWidth:number,
  mini:boolean,
  items?:Array<ItemJson>,
}

interface ListItemProps{
  fullWidth?:number,
  mini?:boolean,
  nested?:boolean,
  item:ItemJson,
}

interface ItemProps extends ListItemProps{
  onClick?: ()=>void,
  children?: any,
  dotBadge?:any,
  className?:string,
}

interface GroupProps extends ListItemProps{
  openedId?:string,
  onOpened: (id:string)=>void,
}

function Subheader(props:ListItemProps){
  const classes = useStyles();
  return (
    <Fragment>
      {!props.mini &&
        <ListSubheader component="div"
          disableSticky
          className = {classes.subHeader}
        >
            {props.item.title}
        </ListSubheader>
      }

    </Fragment>
  )
}

function ItemTo(props: {to?:string, children:any}){
  const classes = useStyles();
  return(
    props.to?
    <NavLink to={ props.to} activeClassName={ classes.activeItem}
      className={classes.itemLink}
    >
      {props.children}
    </NavLink>
    :
    props.children
  )
}

function Item(props:ItemProps){
  const classes = useStyles();
  const {item, mini, dotBadge, className, children, onClick} = props
  const {badge, chip, title, icon} = item
  let iconTsx = (badge ? 
      <Badge 
        color={badge.props.color} 
        badgeContent={badge.props.label} 
        invisible={!mini || !badge.props.label}
      >
        <FontIcon iconClass = {icon} />
      </Badge>
      :
      <FontIcon iconClass = {icon} />
    )
  if(dotBadge){
    iconTsx = (<Badge 
      color={dotBadge.props.color} 
      variant="dot"
      invisible={!dotBadge.props.label}
    >
      <FontIcon iconClass = {icon} />
    </Badge>)
  }

  
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
          <ListItemText primary={title} >
          </ListItemText>
          {(badge && badge.props.label && !mini) &&
            <Chip {... badge.props} />          
          }
          {chip&&
            <Chip {... chip.props}/>          
          }
          {children}      
      </ListItem>
    </ItemTo>    
  )

}


function getBadge(children:Array<any>): any{
  for(let item of children){
    if(item.badge){
      return item.badge
    }
    if(item.children){
      let badge = getBadge(item.children)
      if(badge){
        return badge
      }
    }
  }
  return null
}

function Group(props:GroupProps){
  const open = props.openedId === props.item.id
  const [openedId, setOpenedId] = React.useState('');
  const handleOpened = (id:string)=>{
    setOpenedId(id)
  }

  const handleClick = () => {
    open ? props.onOpened('') : props.onOpened(props.item.id)
  };
  const classes = useStyles();
  const dotBadge = getBadge(props.item.children)

  const listItems = props.item.children?.map((item:ItemJson)=>{
    return (
    <Fragment key={item.id}>
      {
        item.type === 'subheader' && <Subheader nested mini = {props.mini} item={item} />
      }
      {item.type === 'item' && <Item nested mini = {props.mini} item={item}/> }
      {item.type === 'group' && <Group nested mini = {props.mini} item={item} onOpened={handleOpened} openedId={openedId}/>}

    </Fragment>
    )
  })
  return (
    <Fragment>
      <Item className={open ? classes.itemOpened :''} item={props.item} dotBadge={!open && dotBadge} onClick={handleClick}>
        <ChevronRightIcon className={
            classNames(classes.indicator, {[classes.opened] : open}) 
          } 
        />
      </Item>
      <Collapse in={props.openedId === props.item.id} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className={props.mini ? '' : classes.nested}>
          {listItems}
        </List>
      </Collapse>
    </Fragment>
  )  
}

export default function SidebarLinks(props : SidebarLinksProps) {
  const classes = useStyles();
  const [openedId, setOpenedId] = React.useState('');
  
  const handleOpened = (id:string)=>{
    setOpenedId(id)
  }

  const selectMenu = (state: RootState) => state.menu

  const menu = useSelector(selectMenu)

  const listItems = menu.menuItems?.map((item:ItemJson)=>{
    return (
    <Fragment key={item.id}>
      {
        item.type === 'subheader' && <Subheader mini = {props.mini} item={item} />
      }
      {item.type === 'item' && <Item mini = {props.mini} item={item}/>}
      {item.type === 'group' && <Group mini = {props.mini} item={item} onOpened={handleOpened} openedId={openedId}/>}

    </Fragment>
    )
  })

  return (
    <Scrollbar>
      <List
        component="nav"
        className={classes.root}
        style={{
          width: (props.fullWidth) + 'px',
        }}
      >
        {menu.loading?
          <LoadingSkeleton/>
          :
          listItems
        }

      </List>
    </Scrollbar>
  );
}