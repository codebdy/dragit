import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Avatar, Badge, IconButton } from '@material-ui/core';
import MdiIcon from 'Components/Common/MdiIcon';
import { IRxApp } from 'Base/Model/IRxApp';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(2),
    },
    
    content: {
      display:'flex',
      flexFlow:'column',
      justifyContent:'center',
      alignItems:'center',
      cursor:'pointer',
    },
    appAvata: {
      width: theme.spacing(8),
      height: theme.spacing(8),
    },
    appName:{
      marginTop:theme.spacing(2),
    },
    actions:{
      diplay:'flex',
      justifyContent:'space-between'
    },
    pos: {
      paddingLeft: theme.spacing(1),
    },
  }),
);


export default function AppCard(
  props:{
    rxApp:IRxApp
  }
) {
  const {rxApp} = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Badge color="secondary" badgeContent={5}>
          <Avatar className = {classes.appAvata} style={{ backgroundColor: rxApp.color}} variant = "rounded">
            <MdiIcon iconClass = {rxApp.icon} size={40}  />
          </Avatar>
        </Badge>
        <Typography variant="h5" component="div" className={classes.appName}>
          {rxApp.name}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Typography className={classes.pos} color="textSecondary">
          {rxApp.appType}
        </Typography>
        <IconButton>
          <MdiIcon iconClass = "mdi-dots-horizontal" size={20} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
