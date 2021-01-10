import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, fade } from '@material-ui/core';
import intl from 'react-intl-universal';
import MdiIcon from 'Components/Common/MdiIcon';
import TopNavHeightPlaceholder from 'AdminBoard/TopNav/TopNavHeightPlaceholder';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { LeftDrawerWidthPlaceholder } from 'AdminBoard/Sidebar/LeftDrawer/LeftDrawerWidthPlaceholder';
import { useAppStore, useDesigner } from 'Store/Helpers/useAppStore';
import {observer} from 'mobx-react-lite';
import { ID } from 'Base/Model/graphqlTypes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
      display: 'flex',
      flexFlow: 'row',
      alignItems: 'stretch',
    },
    area:{
      border: 'dashed 2px',
      borderColor: fade(theme.palette.primary.main, 0.6),
      display: 'flex',
      justifyContent :'center',
      alignItems : 'center',
      '&:hover':{
        borderColor: theme.palette.primary.main,
      }
    },
    rightArea:{
      flex:1,
      display:'flex',
      flexFlow:'column',
      justifyContent: 'stretch',
    },
    designButton:{
      boxShadow: theme.shadows[10],
      marginTop: theme.spacing(1),
    },

    designButtonIcon:{
      marginRight: theme.spacing(1),
    },
    pageContentArea:{
      flex:1,
    },

    pageList:{
      display:'flex',
      flexFlow:'column',
    },

  }),
);

export const AreaSelect = observer(()=>{
  const classes = useStyles();
  const designer = useDesigner();
  const appStore = useAppStore();
  
  const history = useHistory();

  const handleClose = () => {
    designer.setAreaSelect(false);
  };

  const handleDesignPage = (pageId:ID) =>{
    designer.setAreaSelect(false);
    designer.designPage(pageId);
  }

  const handleDesignDrawer = (event:any)=>{
    designer.setAreaSelect(false);
    history.push('/drawer-edit');
    event.stopPropagation()
  }

  return (
    <Backdrop className={classes.backdrop} open={designer.areaSelect} onClick={handleClose}>
      <LeftDrawerWidthPlaceholder className={classes.area}>
        <Button variant="contained" color="primary" size="large" className={classes.designButton}
          onClick={handleDesignDrawer}
        >
          <MdiIcon iconClass="mdi-pencil-ruler" className={classes.designButtonIcon} />
          {intl.get('design')}
        </Button>
      </LeftDrawerWidthPlaceholder>
      <div 
        className = {classes.rightArea}
      >
        <TopNavHeightPlaceholder></TopNavHeightPlaceholder>
        <div className={classNames(classes.pageContentArea, classes.area) }>
          <div className={classes.pageList}>
            {
              appStore.module?.pages?.map(page=>{
                return (
                  <Button key={page.id} variant="contained" color="primary" size="large" 
                    className={classNames(classes.designButton) }
                    onClick={(e)=>handleDesignPage(page.id)}
                  >
                    <MdiIcon iconClass="mdi-pencil-ruler" className={classes.designButtonIcon} />
                    {page.name}
                  </Button>
                )
              })
            }
          </div>

        </div>
      </div>
    </Backdrop>
  );
})