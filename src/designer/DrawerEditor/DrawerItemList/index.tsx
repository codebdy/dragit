import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import IMenuItem from 'base/IMenuItem';
import { MenuNode } from './MenuNode';
import { RXNode } from 'base/RXNode';
import Scrollbar from 'admin/common/Scrollbar';
import { List, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    userSelect:'none',
    padding:theme.spacing(1),
  },
})
);


export default function DrawerItemList(props : {items?:Array<RXNode<IMenuItem>>}) {
  const {items} = props;
  const classes = useStyles();
  const [selectedId, setSelectedId] = useState(-1);

  return (
    <Scrollbar>
      <List
        className={classes.root}
        component="div"
      >
        {
          items?.map(item=>{
            return (
              <MenuNode key={item.id} node = {item} selectedId = {selectedId} onSelected={setSelectedId}/>
            )
          })
        }
      </List>
    </Scrollbar>
  );
}
