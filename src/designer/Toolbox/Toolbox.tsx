import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import MdiIcon from 'components/common/MdiIcon';
import intl from 'react-intl-universal';
import classNames from 'classnames';
import items from './items'
import { RootState } from 'store';
import { useSelector } from 'react-redux';
import {sideBarSettings} from "utils";
import { parseNode } from 'designer/Core/Node/jsonParser';
import { INode } from 'designer/Core/Node/INode';
import bus, { WILL_FOCUS_NODE } from 'designer/Core/bus';
import TreeView from '@material-ui/lab/TreeView';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import ItemLabel from './ItemLabel';

declare var window: {draggedNode:INode};
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
      //cursor: 'move',
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
  meta?:any,
  children?: Array<any>,
}

function Item(props:{item:ItemJson}){
  const{item} = props
  const classes = useStyles();
  const handleMouseDown=()=>{
    let node = parseNode(JSON.parse(JSON.stringify(item.meta)));
    //node.toFocusState();
    bus.emit(WILL_FOCUS_NODE, node);
    window.draggedNode = node;
    node.toDraggedState();
  }

  return (
    <ListItem className={classes.component} onMouseDown={handleMouseDown}>
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
    <Fragment>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
      >
        <TreeItem nodeId="1" label={<ItemLabel title="页面" />}>
          <TreeItem nodeId="2" label={<ItemLabel isLeaf title="叶子" />} />
          <TreeItem nodeId="3" label="文章列表" />
          <TreeItem nodeId="4" label="订单编辑" />
        </TreeItem>
        <TreeItem nodeId="5" label={<ItemLabel title="documents" />}>
          <TreeItem nodeId="10" label="OSS" />
          <TreeItem nodeId="6" label="Material-UI">
            <TreeItem nodeId="7" label="src">
              <TreeItem nodeId="8" label="index.js" />
              <TreeItem nodeId="9" label="tree-view.js" />
            </TreeItem>
          </TreeItem>
        </TreeItem>
      </TreeView>      
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
    </Fragment>
   );
}