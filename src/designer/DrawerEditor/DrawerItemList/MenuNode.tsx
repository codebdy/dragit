import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import IMenuItem from 'base/IMenuItem';
import { RXNode } from 'base/RXNode';
import MdiIcon from 'components/common/MdiIcon';

type MenuNodeProps = TreeItemProps & {
  item:RXNode<IMenuItem>
};

const useStyles = makeStyles((theme: Theme) => createStyles({
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
  },
})
);
export function MenuNode(props: MenuNodeProps) {
  const classes = useStyles();
  const { item, ...other } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <MdiIcon className={classes.labelIcon} iconClass = {item.meta.icon} />
          <Typography variant="body2" className={classes.labelText}>
            label text
          </Typography>
          <Typography variant="caption" color="inherit">
            label info
          </Typography>
        </div>}
      {...other} 
    >
      {
        item.children?.map(child=>{
          return(
            <MenuNode key={child.id} item = {child} nodeId = {child.id.toString()}/>
          )
        })
      }
    </TreeItem>
  );
}
