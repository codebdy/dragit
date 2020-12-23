import React, { Fragment } from "react";
import MdiIcon from "components/common/MdiIcon"
import IconButton from '@material-ui/core/IconButton';
import { Tooltip, Hidden } from "@material-ui/core";
import intl from 'react-intl-universal';
import { NavLink } from "react-router-dom";
import { AUTH_CUSTOMIZE, AUTH_DEBUG, AUTH_THEME_SETTINGS } from "APIs/authSlugs";
import { useAppStore, useDesigner, useLeftDrawer } from "store/helpers/useAppStore";
import { useLoggedUser } from "store/helpers/useLoggedUser";
import { observer } from "mobx-react-lite";

/*const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      top: theme.spacing(2),
      left:'calc(50% - 100px)',
      height:'52px',
      color:"rgba(255,255,255,1)",
      display: 'flex',
      flexFlow: 'row',
      justifyContent: 'center',
      alignItems:'center',
      borderRadius:'5px',
      padding:'10px 0',
      zIndex:theme.zIndex.appBar,
    },
  }),
);*/

export const DesignButtons = observer((
  props:{
    color?:string,
  }
)=>{
  const {color} = props;
  //const classes = useStyles();
  const loggedUser = useLoggedUser();

  const design = useDesigner();  
  const lefDrawer = useLeftDrawer();
  const appStore = useAppStore();

  const handleOpen = () => {
    design.setAreaSelect(true);
    lefDrawer.compactable && lefDrawer.toggleCompactable();
  };

  return(
    <Hidden smDown>{}
    {
      <Fragment  /*className={classes.root} elevation={24}*/>
        {
          loggedUser.authCheck(AUTH_CUSTOMIZE)&&
          <Fragment>
            <Tooltip title={intl.get('design-layout')} arrow placement="bottom">
              <IconButton aria-label={intl.get('design-layout')} onClick={handleOpen}>
                <MdiIcon iconClass="mdi-pencil-ruler" color={color}/>
              </IconButton>
            </Tooltip>
            <Tooltip title={intl.get('modules')} arrow placement="bottom">
              <NavLink to={'/design'}>
                <IconButton aria-label={intl.get('modules')} >
                  <MdiIcon iconClass="mdi-view-grid-plus" color={color} />
                </IconButton>
              </NavLink>
            </Tooltip>          
          </Fragment>
        }

        {
          loggedUser.authCheck(AUTH_THEME_SETTINGS)&&
          <Tooltip title={intl.get('theme-settings')} arrow placement="bottom"
            onClick = {()=>appStore.openShowThemeSettings()}
          >
            <IconButton aria-label={intl.get('theme-settings')} >
              <MdiIcon iconClass="mdi-image-filter-black-white" color={color} />
            </IconButton>
          </Tooltip>          
        }
        {
          loggedUser.authCheck(AUTH_DEBUG)&&
          <Tooltip title={intl.get('debug')} arrow placement="bottom">
            <IconButton  aria-label={intl.get('debug')}>
              <MdiIcon iconClass="mdi-android-debug-bridge" color={color} />
            </IconButton>
          </Tooltip>          
        }

      </Fragment >
    }
    </Hidden>
  )
})