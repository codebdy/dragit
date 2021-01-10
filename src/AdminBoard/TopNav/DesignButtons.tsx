import React, { Fragment } from "react";
import MdiIcon from "components1/common/MdiIcon"
import IconButton from '@material-ui/core/IconButton';
import { Tooltip, Hidden } from "@material-ui/core";
import intl from 'react-intl-universal';
import { NavLink } from "react-router-dom";
import { AUTH_CUSTOMIZE } from "base1/authSlugs";
import { useDesigner, useLeftDrawer } from "store1/helpers1/useAppStore";
import { useLoggedUser } from "store1/helpers1/useLoggedUser";
import { observer } from "mobx-react-lite";

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
      </Fragment >
    }
    </Hidden>
  )
})