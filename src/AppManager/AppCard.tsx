import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Avatar, Badge, IconButton } from '@material-ui/core';
import MdiIcon from 'Components/Common/MdiIcon';
import green from '@material-ui/core/colors/green';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 200,
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


export default function AppCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Badge color="secondary" variant="dot">
          <Avatar className = {classes.appAvata} style={{ backgroundColor: green[500]}}>
            <MdiIcon iconClass = "mdi-account-supervisor" size={40}  />
          </Avatar>
        </Badge>
        <Typography variant="h5" component="div" className={classes.appName}>
          用户管理
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Typography className={classes.pos} color="textSecondary">
          免费
        </Typography>
        <IconButton>
          <MdiIcon iconClass = "mdi-dots-horizontal" size={20} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
