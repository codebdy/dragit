import { makeStyles, Theme, createStyles, Divider, Collapse, List } from "@material-ui/core";
import IMenuItem from "base/IMenuItem"
import { RXNode } from "base/RXNode/RXNode"
import classNames from "classnames"
import React, { Fragment } from "react"
import Subheader from "./Subheader";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuNode from "./MenuNode";

export const openBackground = "rgba(255,255,255, 0.05)";
export const openBackgroundLight = "rgba(0,0,0, 0.05)";
export const activeBackground = "rgba(255,255,255, 0.2)";
export const activeBackgroundLight = "rgba(0,0,0, 0.2)";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    },
    itemOpened:{
      background: theme.palette.type === 'dark' ? openBackground : openBackgroundLight,
      "&:hover,&:focus": {
        backgroundColor:  theme.palette.type === 'dark' ? openBackground : openBackgroundLight,
      }
    },
    indicator:{
      transition:"all 0.3s",
    },
    opened:{
      transform:'rotate(90deg)',
    },
  }),
);
export function getBadge(children:Array<any>): any{
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

export default function MenuNodeGroup(
  props:{
    node:RXNode<IMenuItem>,
    openedId?: number,
    onOpened: (id:number)=>void,
    mini:boolean,
    nested?:boolean,
  }
)
{
  const open = props.openedId === props.node.id
  const [openedId, setOpenedId] = React.useState(-1);
  const handleOpened = (id:number)=>{
    setOpenedId(id)
  }

  const handleClick = () => {
    open ? props.onOpened(-1) : props.onOpened(props.node.id)
  };
  const classes = useStyles();
  const dotBadge = getBadge(props.node.meta.children)

  const listItems = props.node.children?.map((node:RXNode<IMenuItem>)=>{
    let item = node.meta;
    return (
    <Fragment key={node.id}>
      {
        item.type === 'subheader' && <Subheader nested mini = {props.mini} node={node} />
      }
      {item.type === 'item' && <MenuNode nested mini = {props.mini} node={node}/> }
      {item.type === 'group' && <MenuNodeGroup nested mini = {props.mini} node={node} onOpened={handleOpened} openedId={openedId}/>}
      {item.type === 'divider' && <Divider />}
    </Fragment>
    )
  })
  return (
    <Fragment>
      <MenuNode className={open ? classes.itemOpened :''} 
        mini= {props.mini} 
        node={props.node} 
        dotBadge={!open && dotBadge} 
        onClick={handleClick}
      >
        <ChevronRightIcon className={
            classNames(classes.indicator, {[classes.opened] : open}) 
          } 
        />
      </MenuNode>
      <Collapse in={props.openedId === props.node.id} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className={props.mini ? '' : classes.nested}>
          {listItems}
        </List>
      </Collapse>
    </Fragment>
  )  
}
