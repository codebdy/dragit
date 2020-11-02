import React from 'react';
import { makeStyles, Theme, createStyles, Paper, Divider, IconButton, Typography, ClickAwayListener, Grow, MenuItem, MenuList, Popper, ListItemIcon, ListItemText, Grid } from '@material-ui/core';
import classNames from 'classnames';
import intl from 'react-intl-universal';
import MdiIcon from './common/MdiIcon';
import { MediaMeta } from './Medias/MediaGridListImage';
import { mergeArray } from 'ArrayHelper';
import MediasPortletFeathureGrid from './MediasPortletFeathureGrid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    portlet: {
      flex:1,
    },
    header:{
      padding:theme.spacing(2),
      display: 'flex',
      flexFlow: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    body:{
      padding:theme.spacing(2),
    },

  }),
);

const MediasPortlet = React.forwardRef((
  props: {
    className?:any
  }, 
  ref:any
)=>{
  const{className, ...rest} = props;
  const classes = useStyles();
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [medias, setMedias] = React.useState<Array<MediaMeta>>([]);

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef && anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setMenuOpen(false)
  };
  const handleListKeyDown = (event: React.KeyboardEvent) =>{
    if (event.key === 'Tab') {
      event.preventDefault();
      setMenuOpen(false);
    }
  }

  const handleSelectedMedias = (selectedMedias:Array<MediaMeta>)=>{
    setMedias(mergeArray(medias,selectedMedias ));
  }

  return (
    <Paper 
      ref={ref}
      {...rest}
      className = { classNames(classes.portlet, className) }
    >
      <div className = {classes.header}>
        <Typography variant="h5">
          {intl.get('media')}
        </Typography>
        
        <IconButton ref={anchorRef} onClick={()=>setMenuOpen(true)} >              
          <MdiIcon iconClass = "mdi-dots-vertical" />
        </IconButton>
        <Popper open={menuOpen} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{zIndex:1}}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper elevation={5} >
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={menuOpen} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <MdiIcon iconClass="mdi-text-recognition" />
                      </ListItemIcon>
                      <ListItemText primary={intl.get('edit-alt-text')} />
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <MdiIcon iconClass="mdi-delete-sweep-outline" />
                      </ListItemIcon>
                      <ListItemText primary={intl.get('delete-all-medias')} />
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>        
      </div>
      <Divider></Divider>
      <div className={classes.body}>
        <Grid container spacing={3}>
          <MediasPortletFeathureGrid medias={medias} onSelectMedias={handleSelectedMedias} />
        </Grid>

      </div>
    </Paper>
  )
})

export default MediasPortlet;
