import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardMedia, CircularProgress, Divider, IconButton, ListItemIcon, Menu, MenuItem } from '@material-ui/core';
import MdiIcon from 'Components/common/MdiIcon';
import intl from 'react-intl-universal';
import { useHistory } from 'react-router-dom';
import { useShowAppoloError } from 'Store/Helpers/useInfoError';
import { useMutation } from '@apollo/react-hooks';
import { GET_RX_APP_LIST, REMOVE_RX_APP } from 'Base/GraphQL/APP_GQLs';
import { useDragItStore } from 'Store/Helpers/useDragItStore';
import { IRxTemplate } from 'Base/Model/IRxTemplate2';
import Image from 'Components/common/Image';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //paddingTop: theme.spacing(2),
    },
    content: {
      display:'flex',
      flexFlow:'column',
      justifyContent:'center',
      alignItems:'center',
      cursor:'pointer',
      padding:theme.spacing(1),
    },
    actions:{
      diplay:'flex',
      justifyContent:'space-between',
      minHeight:theme.spacing(6),
      padding:theme.spacing(0,1),
    },
    pos: {
      //paddingLeft: theme.spacing(1),
    },

    menuItem:{
      padding:theme.spacing(1, 3),
    },

    menuButton:{
      width: '40px',
      height: '40px',
    },
  }),
);


export default function TemplateCard(
  props:{
    templates:Array<IRxTemplate>,
    rxTemplate:IRxTemplate
  }
) {
  const {templates, rxTemplate} = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const classes = useStyles();
  const isMenuOpen = Boolean(anchorEl);
  const history = useHistory();
  const dragItStore = useDragItStore();

  const [excuteRemoveRxPage, {loading, error}] = useMutation( REMOVE_RX_APP,
    {
      //更新缓存
      update(cache, { data: { removeRxApp } }){
        cache.writeQuery({
          query:GET_RX_APP_LIST,
          data:{
            rxTemplates:templates.filter(template=>template.id !== removeRxApp.id)
          }
        });
      },
      onCompleted: (data)=>{
        dragItStore.setSuccessAlert(true);
      }
    }
  );

  useShowAppoloError(error);
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const hadleEdit = ()=>{
    history.push(`/app-studio/${rxTemplate.id}`)
    setAnchorEl(null);
  }

  const handleRemove = ()=>{
    setAnchorEl(null);
    dragItStore?.confirmAction(intl.get('confirm-delete'), ()=>{
      excuteRemoveRxPage({
        variables:{
          id:rxTemplate.id,
          //authIds:rxTemplate.auths?.map(auth=>auth.id),
          //pageIds:rxTemplate.pages?.map(page=>page.id)||[''],
        }
      })     
    })

  }

  const handleToApp = ()=>{
    //history.push(`/app/${rxTemplate?.id}/`)
  }
  
  return (
    <Card className={classes.root}>
      <CardContent 
        className={classes.content}
        onClick = {handleToApp}
      >
        <Image borderRadius = "0" src = {rxTemplate.media?.thumbnail}/>
        
      </CardContent>
      <CardActions className={classes.actions}>
        <Typography className={classes.pos}>
          {rxTemplate.name}
        </Typography>
        {
          loading 
          ? <CircularProgress size = {24}/>
          : <>
              <IconButton
                onClick = {handleMenuOpen}
                className = {classes.menuButton}
              >
                <MdiIcon iconClass = "mdi-dots-horizontal" size={20} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={isMenuOpen}
                onClose={handleMenuClose}
                
              >
                <MenuItem onClick={hadleEdit} className = {classes.menuItem}>
                  <ListItemIcon>
                    <MdiIcon iconClass = "mdi-pencil"  size={18}/>
                  </ListItemIcon>
                  {intl.get('edit')} 
                </MenuItem>
                <Divider/>
                <MenuItem onClick={hadleEdit} className = {classes.menuItem}>
                  <ListItemIcon>
                    <MdiIcon iconClass = "mdi-delete-forever" color={'red'}  size={18}/>
                  </ListItemIcon>
                  {intl.get('delete')} 
                </MenuItem>
              </Menu>
            </>
        }


      </CardActions>
    </Card>
  );
}
