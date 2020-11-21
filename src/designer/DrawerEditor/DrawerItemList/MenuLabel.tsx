import React from 'react';
import { makeStyles, Theme, createStyles, Chip, Divider } from '@material-ui/core';
import IMenuItem from 'base/IMenuItem';
import MdiIcon from 'components/common/MdiIcon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

  }),
);

export default function MenuLabel(props:{item:IMenuItem}){
  const {item} = props;
  const {title, type, icon, chip, badge} = item;

  let label :any  = title;
  if(type === 'divider'){
    label = <Divider />
  }

  const classes = useStyles();
  return (
    <div className={classes.labelRoot}>
      {
        type !== 'subheader' && type !== 'divider' &&
        <MdiIcon className={classes.labelIcon} iconClass = {icon} />        
      }

      <div className={classes.labelText}>
        {label}
      </div>
      <div>
        {
          chip && <Chip {... chip.props}/>
        }
        {
          badge && <Chip {... badge.props}/>
        }
      </div>
    </div>
  )
}
