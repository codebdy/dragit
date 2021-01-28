import React, { Fragment, useEffect } from "react";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import SiderBarLoadingSkeleton from "./LoadingSkeleton";
import IMenuItem from "Base/Model/IMenuItem";
import { Divider } from "@material-ui/core";
import { RxNode } from "rx-drag/models/RxNode";
import Subheader from "./MenuItems/Subheader";
import { MenuNode } from "./MenuItems/MenuNode";
import { MenuNodeGroup } from "./MenuItems/MenuNodeGroup";
import { useQuery } from '@apollo/react-hooks';
import {observer} from "mobx-react";
import { ID } from "rx-drag/models/baseTypes";
import { GET_DRAWER } from "../../Base/GraphQL/GQLs";
import Scrollbar from "AdminBoard/Common/Scrollbar";
import { useShowAppoloError } from "Store/Helpers/useInfoError";
import { useLoggedUser } from "Store/Helpers/useLoggedUser";
import { cloneObject } from "rx-drag/utils/cloneObject";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
  }),
);

export const SidebarLinks = observer((
  props : {
    fullWidth?:number,
    mini:boolean,
  }
)=>{
  const classes = useStyles();
  const [openedId, setOpenedId] = React.useState('');
  const { loading, error, data } = useQuery(GET_DRAWER/*, {fetchPolicy:'no-cache'}*/);
  const [items,setItems] = React.useState<Array<RxNode<IMenuItem>>>([]);
  const loggedUser = useLoggedUser();

  const handleOpened = (id:ID)=>{
    setOpenedId(id)
  }

  useShowAppoloError(error)

  useEffect(()=>{
    let root = new RxNode<IMenuItem>();
    root.parse(cloneObject(data?.drawer?.items||[]));
    data && setItems(root.children);          
  },[data]);

  const listItems =items?.map((node:RxNode<IMenuItem>)=>{
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
})