import React, { Fragment, useEffect } from "react";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import IMenuItem from "Base/Model/IMenuItem";
import { Divider } from "@material-ui/core";
import { RxNode } from "rx-drag/models/RxNode";
import Subheader from "./MenuItems/Subheader";
import { MenuNode } from "./MenuItems/MenuNode";
import { MenuNodeGroup } from "./MenuItems/MenuNodeGroup";
import {observer} from "mobx-react";
import { ID } from "rx-drag/models/baseTypes";
import Scrollbar from "Common/Scrollbar";
import { useLoggedUser } from "Store/Helpers/useLoggedUser";
import { cloneObject } from "rx-drag/utils/cloneObject";
import { useLeftDrawer } from "Store/Helpers/useDragItStore";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
  }),
);

export const SidebarLinks = observer((
  props : {
    items?:Array<IMenuItem>,
  }
)=>{
  const {items} = props;
  const classes = useStyles();
  const [openedId, setOpenedId] = React.useState('');
  const loggedUser = useLoggedUser();
  const [nodes,setNodes] = React.useState<Array<RxNode<IMenuItem>>>([]);
  const leftDrawer = useLeftDrawer();
  const mini = leftDrawer.isMini;
  const fullWidth = leftDrawer.fullWidth;
  const handleOpened = (id:ID)=>{
    setOpenedId(id)
  }

  useEffect(()=>{
    let root = new RxNode<IMenuItem>();
    root.parse(cloneObject(items||[]));
    setNodes(root.children);
  },[items]);

  return (
    <Scrollbar>
      <List
        component="nav"
        className={classes.root}
        style={{
          width: (fullWidth) + 'px',
        }}
      >
        {
          nodes?.map((node:RxNode<IMenuItem>)=>{
            let item = node.meta;
            const authed = loggedUser.authCheck(...node.meta?.auths?.map(auth=>auth.id)||[]);
            return (
            <Fragment key={node.id}>
              {
                item.type === 'subheader' && authed && <Subheader mini = {mini} node={node} />
              }
              {item.type === 'item' && authed && <MenuNode mini = {mini} node={node}/>}
              {item.type === 'group' && authed && <MenuNodeGroup mini = {mini} node={node} onOpened={handleOpened} openedId={openedId}/>}
              {item.type === 'divider' && authed && <Divider />}
            </Fragment>
            )
          })
        }
      </List>
    </Scrollbar>
  );
})