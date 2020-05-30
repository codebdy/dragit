import React, { Fragment } from "react";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarBorder from '@material-ui/icons/StarBorder';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { SvgIcon } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import classNames from "classnames";
import Scrollbar from "../Scrollbar";
import Badge from '@material-ui/core/Badge';
import Chip from '@material-ui/core/Chip';
import { useSelector } from "react-redux";

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
      paddingTop: theme.spacing(1.5),
      paddingBottom: theme.spacing(1.5),
      paddingLeft: '23px',
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

    opend:{
      transform:'rotate(90deg)',
    },

    bullet:{
      minWidth:'46px',
    },

    scrollable:{
      flex:1,
      overflowY: 'auto',
      position: 'relative',
    },
    icon:{
      fontSize: '24px',
    }
  }),
);

interface RootState {
  menu:any,
}

interface SidebarLinksProps{
  fullWidth:number,
  isMini:boolean,
  items?:Array<any>,
}

interface ListItemProps{
  fullWidth?:number,
  isMini?:boolean,
  nested?:boolean,
  item:any,
}

interface ItemProps extends ListItemProps{
  onClick?: ()=>void,
  children?:any,
}

interface GroupProps extends ListItemProps{
  openedId?:string,
  onOpened: (id:string)=>void,
}

function Subheader(props:ListItemProps){
  const classes = useStyles();
  return (
    <Fragment>
      {!props.isMini &&
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

function Item(props:ItemProps){
  const classes = useStyles();
  return (
    <ListItem 
      button 
      className = {classes.listItem}
      onClick = {props.onClick}
    >
        <ListItemIcon>
          <i className={classNames(props.item.icon, classes.icon)}>
          </i>
        </ListItemIcon>
        <ListItemText primary={props.item.title}>
        </ListItemText>
        {props.children}      
    </ListItem>
  )

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
  const listItems = props.item.children?.map((item:any)=>{
    return (
    <Fragment key={item.id}>
      {
        item.type === 'subheader' && <Subheader nested item={item} />
      }
      {item.type === 'item' && <Item nested item={item}/>}
      {item.type === 'group' && <Group nested item={item} onOpened={handleOpened} openedId={openedId}/>}

    </Fragment>
    )
  })
  return (
    <Fragment>
      <Item item={props.item} onClick={handleClick}>
        <ChevronRightIcon className={
            classNames(classes.indicator, {[classes.opend] : open}) 
          } 
        />
      </Item>
      <Collapse in={props.openedId === props.item.id} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className={props.isMini ? '' : classes.nested}>
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

  const listItems = menu.menuItems?.map((item:any)=>{
    return (
    <Fragment key={item.id}>
      {
        item.type === 'subheader' && <Subheader item={item} />
      }
      {item.type === 'item' && <Item item={item}/>}
      {item.type === 'group' && <Group item={item} onOpened={handleOpened} openedId={openedId}/>}

    </Fragment>
    )
  })

  return (
    <Scrollbar>
      <List
        component="nav"
        className={classes.root}
        style={{
          width: (props.fullWidth -7) + 'px',
        }}
      >
        { listItems }

        {!props.isMini && 
          <ListSubheader component="div"
            disableSticky
            className = {classes.subHeader}
          >
              Nested List Items
          </ListSubheader>
        }
        <ListItem button className = {classes.listItem}>
          <ListItemIcon>
            <Icon>home</Icon>
          </ListItemIcon>
          <ListItemText primary='仪表盘'>
            
          </ListItemText>
        </ListItem>
        <ListItem button className = {classes.listItem}>
          <ListItemIcon>
          <Badge color="secondary" badgeContent={100} invisible={false}>
            <DraftsIcon />
          </Badge>
          </ListItemIcon>
          <ListItemText primary='Draft' />
          <Chip
            size="small"
            label="新"
            clickable
            color="primary"
          />          
        </ListItem>
        <ListItem button className = {classes.listItem}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
          <Chip
            size="small"
            label="热"
            clickable
            color="secondary"
          />    
        </ListItem>
      </List>
    </Scrollbar>
  );
}