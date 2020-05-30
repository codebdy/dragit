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
  const handleClick = () => {
    open ? props.onOpened('') : props.onOpened(props.item.id)
  };
  const classes = useStyles();
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
          sfawfew
        </List>
      </Collapse>
    </Fragment>
  )  
}

export default function SidebarLinks(props : SidebarLinksProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openedId, setOpenedId] = React.useState('');
  
  const handleClick = () => {
    setOpen(!open);
  };

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
        <ListItem button className = {classes.listItem} onClick={handleClick}>
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
          <ChevronRightIcon className={
                classNames(classes.indicator, {[classes.opend] : open}) 
              } 
          />
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" className={classNames({[classes.nested]: !props.isMini}, classes.nestedList)}>
            <ListItem button >
              <ListItemIcon className={classes.bullet}>
                <Badge color="secondary" badgeContent={100} invisible={false}>
                  <SvgIcon>
                    <path fill="currentColor" d="M12,10A2,2 0 0,0 10,12C10,13.11 10.9,14 12,14C13.11,14 14,13.11 14,12A2,2 0 0,0 12,10Z" />
                  </SvgIcon>
                </Badge>
              </ListItemIcon>
              <ListItemText primary="Starred1" />
            </ListItem>
            <ListItem button>
              <ListItemIcon className={classes.bullet}>
                 <span style={{marginLeft:'5px'}}>编</span>
              </ListItemIcon>
              <ListItemText primary="Starred2" />
            </ListItem>
            <ListItem button>
              <ListItemIcon className={classes.bullet}>
              <span style={{marginLeft:'5px'}}>表</span>
              </ListItemIcon>
              <ListItemText primary="Starred3" />
            </ListItem>
            <ListItem button>
              <ListItemIcon className={classes.bullet}>
              <SvgIcon>
                  <path fill="currentColor" d="M12,10A2,2 0 0,0 10,12C10,13.11 10.9,14 12,14C13.11,14 14,13.11 14,12A2,2 0 0,0 12,10Z" />
                </SvgIcon>
              </ListItemIcon>
              <ListItemText primary="Starred4" />
            </ListItem>
            <ListItem button>
              <ListItemIcon className={classes.bullet}>
              <SvgIcon>
                  <path fill="currentColor" d="M12,10A2,2 0 0,0 10,12C10,13.11 10.9,14 12,14C13.11,14 14,13.11 14,12A2,2 0 0,0 12,10Z" />
                </SvgIcon>
              </ListItemIcon>
              <ListItemText primary="Starred5" />
            </ListItem>
            <ListItem button >
              <ListItemIcon className={classes.bullet}>
              <SvgIcon>
                  <path fill="currentColor" d="M12,10A2,2 0 0,0 10,12C10,13.11 10.9,14 12,14C13.11,14 14,13.11 14,12A2,2 0 0,0 12,10Z" />
                </SvgIcon>
              </ListItemIcon>
              <ListItemText primary="Starred6" />
            </ListItem>
            <ListItem button>
              <ListItemIcon >
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred7" />
              <ChevronRightIcon className={
                classNames(classes.indicator, {[classes.opend] : open}) 
              } 
          />
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding className={props.isMini ? '' : classes.nested}>
                <ListItem button>
                  <ListItemIcon className={classes.bullet}>
                  <SvgIcon>
                      <path fill="currentColor" d="M12,10A2,2 0 0,0 10,12C10,13.11 10.9,14 12,14C13.11,14 14,13.11 14,12A2,2 0 0,0 12,10Z" />
                    </SvgIcon>
                  </ListItemIcon>
                  <ListItemText primary="Starred6" />
                </ListItem>
                <ListItem button >
                  <ListItemIcon className={classes.bullet}>
                  <SvgIcon>
                      <path fill="currentColor" d="M12,10A2,2 0 0,0 10,12C10,13.11 10.9,14 12,14C13.11,14 14,13.11 14,12A2,2 0 0,0 12,10Z" />
                    </SvgIcon>
                  </ListItemIcon>
                  <ListItemText primary="Starred6" />
                </ListItem>
              </List>

            </Collapse>
          </List>
        </Collapse>
      </List>
    </Scrollbar>
  );
}