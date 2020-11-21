import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import IMenuItem from 'base/IMenuItem';
import { MenuNode } from './MenuNode';
import { RXNode } from 'base/RXNode';
import Scrollbar from 'admin/common/Scrollbar';

const useStyles = makeStyles(
  createStyles({
    root: {
      flexGrow: 1,
      width:'100%',
    },
  }),
);

export default function DrawerItemList(props : {items?:Array<RXNode<IMenuItem>>}) {
  const {items} = props;
  const classes = useStyles();

  return (
    <Scrollbar>
      <TreeView
        className={classes.root}
        defaultExpanded={['3']}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
      >
        {
          items?.map(item=>{
            return (
              <MenuNode key={item.id} item = {item} nodeId = {item.id.toString()}/>
            )
          })
        }
        {/*<MenuNode nodeId="1" labelText="All Mail" labelIcon={MailIcon} />
        <MenuNode nodeId="2" labelText="Trash" labelIcon={DeleteIcon} />
        <MenuNode nodeId="3" labelText="Categories" labelIcon={Label}>
          <MenuNode
            nodeId="5"
            labelText="Social"
            labelIcon={SupervisorAccountIcon}
            labelInfo="90"
          />
          <MenuNode
            nodeId="6"
            labelText="Updates"
            labelIcon={InfoIcon}
            labelInfo="2,294"
          />
          <MenuNode
            nodeId="7"
            labelText="Forums"
            labelIcon={ForumIcon}
            labelInfo="3,566"
          />
          <MenuNode
            nodeId="8"
            labelText="Promotions"
            labelIcon={LocalOfferIcon}
            labelInfo="733"
          />
        </MenuNode>
      <MenuNode nodeId="4" labelText="History" labelIcon={Label} />*/}
      </TreeView>
    </Scrollbar>
  );
}
