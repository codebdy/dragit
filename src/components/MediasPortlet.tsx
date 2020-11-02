import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles, Paper, Divider, IconButton, Typography, ClickAwayListener, Grow, MenuItem, MenuList, Popper, ListItemIcon, ListItemText, Grid, Hidden } from '@material-ui/core';
import classNames from 'classnames';
import intl from 'react-intl-universal';
import MdiIcon from './common/MdiIcon';
import { MediaMeta } from './Medias/MediaGridListImage';
import { exchange, mergeArray, remove } from 'ArrayHelper';
import MediasPortletFeathureGrid from './MediasPortletFeathureGrid';
import MediasPortletColumnsGrid from './MediasPortletColumnsGrid';
import MediasPortletAltsDialog from './MediasPortletAltsDialog';

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
    className?:any,
    cols?:number
  }, 
  ref:any
)=>{
  const{className, cols, ...rest} = props;
  const classes = useStyles();
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [medias, setMedias] = React.useState<Array<MediaMeta>>([]);
  const [altsOpen, setAltsOpen] = React.useState(false); 


  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef && anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setMenuOpen(false);
  };
  const handleListKeyDown = (event: React.KeyboardEvent) =>{
    if (event.key === 'Tab') {
      event.preventDefault();
      setMenuOpen(false);
    }
  }

  const handleClear = ()=>{
    setMedias([]);
    setMenuOpen(false);
  }

  const handleEditAlts = ()=>{
    setAltsOpen(true);
    setMenuOpen(false);  
  }

  const handleSelectedMedias = (selectedMedias:Array<MediaMeta>)=>{
    setMedias(mergeArray(medias,selectedMedias ));
  }

  const handleSwap = (first:MediaMeta, second:MediaMeta)=>{
    setMedias(exchange(first, second, medias));
  }

  const handleRemove = (media:MediaMeta)=>{
    setMedias([...remove(media, medias)]);
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
                    <MenuItem onClick={handleEditAlts}>
                      <ListItemIcon>
                        <MdiIcon iconClass="mdi-text-recognition" />
                      </ListItemIcon>
                      <ListItemText primary={intl.get('edit-alt-text')} />
                    </MenuItem>
                    <MenuItem onClick={handleClear}>
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
          {
            cols ?
            <MediasPortletColumnsGrid 
            medias={medias}
            cols = {cols}
            onSelectMedias={handleSelectedMedias}
            onSwap = {handleSwap}
            onRemove = {handleRemove}            
          />            
          :
            <Fragment>
              <Hidden smDown>
                <MediasPortletFeathureGrid 
                  medias={medias} 
                  onSelectMedias={handleSelectedMedias}
                  onSwap = {handleSwap}
                  onRemove = {handleRemove}
                />
              </Hidden>
              <Hidden mdUp>
                <MediasPortletColumnsGrid 
                  medias={medias} 
                  onSelectMedias={handleSelectedMedias}
                  onSwap = {handleSwap}
                  onRemove = {handleRemove}            
                />
              </Hidden>
            </Fragment>

          }
        </Grid>
        <MediasPortletAltsDialog medias={medias} open = {altsOpen} onClose={()=>setAltsOpen(false)} />
      </div>
    </Paper>
  )
})

export default MediasPortlet;
