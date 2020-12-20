import React, { Fragment, useEffect } from "react";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Scrollbar from "../common/Scrollbar";
import SiderBarLoadingSkeleton from "./LoadingSkeleton";
import { API_GET_DRAWER } from "APIs/drawer";
import { useAxios } from "base/Hooks/useAxios";
import IMenuItem from "base/Model/IMenuItem";
import { Divider } from "@material-ui/core";
import { RXNode } from "base/RXNode/RXNode";
import Subheader from "./MenuItems/Subheader";
import MenuNode from "./MenuItems/MenuNode";
import MenuNodeGroup from "./MenuItems/MenuNodeGroup";
import { RXNodeRoot } from "base/RXNode/Root";
import useLoggedUser from "store/app/useLoggedUser";
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { cloneObject } from "utils/cloneObject";

// 定义查询语句
const GET_DRAWER_ITEMS = gql`
  query GetDrawerItems {
    drawerItems{
      type
      title
      icon
      badge
      chip
      children
      to
      auths
    }
  }
`;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
  }),
);


export default function SidebarLinks(
  props : {
    fullWidth:number,
    mini:boolean,
  }
) {
  const classes = useStyles();
  const [openedId, setOpenedId] = React.useState(-1);
  //const [jsonData, ] = useAxios<Array<IMenuItem>>(API_GET_DRAWER);
  const { loading, error, data } = useQuery(GET_DRAWER_ITEMS);
  const [items,setItems] = React.useState<Array<RXNode<IMenuItem>>>([]);
  const loggedUser = useLoggedUser();

  const handleOpened = (id:number)=>{
    setOpenedId(id)
  }

  useEffect(()=>{
    let root = new RXNodeRoot<IMenuItem>();
    root.parse( cloneObject(data?.drawerItems) || []);
    data && setItems(root.children);    
  },[data]);

  const listItems =items?.map((node:RXNode<IMenuItem>)=>{
    let item = node.meta;
    const authed = loggedUser.authCheck(...node.meta?.auths||[]);
    return (
    <Fragment key={node.id}>
      {
        item.type === 'subheader' && authed && <Subheader mini = {props.mini} node={node} />
      }
      {item.type === 'item' && authed && <MenuNode mini = {props.mini} node={node}/>}
      {item.type === 'group' && authed && <MenuNodeGroup mini = {props.mini} node={node} onOpened={handleOpened} openedId={openedId}/>}
      {item.type === 'divider' && authed && <Divider />}
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
        {loading?
          <SiderBarLoadingSkeleton/>
          :
          listItems
        }

      </List>
    </Scrollbar>
  );
}