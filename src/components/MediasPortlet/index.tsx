import React, { Fragment, useEffect } from 'react';
import { makeStyles, Theme, createStyles, Paper, Divider, IconButton, Typography, ClickAwayListener, Grow, MenuItem, MenuList, Popper, ListItemIcon, ListItemText, Grid, Hidden } from '@material-ui/core';
import intl from 'react-intl-universal';
import MdiIcon from '../common/MdiIcon';
import { add, exchange, remove } from 'ArrayHelper';
import MediasPortletFeathureGrid from './MediasPortletFeathureGrid';
import MediasPortletColumnsGrid from './MediasPortletColumnsGrid';
import MediasPortletAltsDialog from './MediasPortletAltsDialog';
import { RXInputProps } from 'base/RXInputProps';
import { Skeleton } from '@material-ui/lab';
import HoverablePaper from 'components/common/HoverablePaper';
import { IMedia } from 'base/Model/IMedia';

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

export function contains(node:any, array:any) {
  for (var i = 0; i < array.length; i++) {
      if (array[i].id === node.id) {
          return true
      }
  }

  return false
}

export function mergeArray(oldArray:any, newArray:any){
  for (var i = 0; i < newArray.length; i++) {
      if (!contains(newArray[i], oldArray) ) {
          add(newArray[i], oldArray)
      }
  }
  return [...oldArray];
}

const MediasPortlet = React.forwardRef((
  props: {
    value?:any
    cols?:number,
  } & RXInputProps, 
  ref:any
)=>{
  const{value, cols, onChange, error, helperText, loading, ...rest
  } = props;
  const classes = useStyles();
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [medias, setMedias] = React.useState<Array<IMedia>>(value? value :[]);
  const [altsOpen, setAltsOpen] = React.useState(false); 

  useEffect(() => {
    setMedias(value? value :[])
  },[value]);
  
  useEffect(() => {
    if(medias !== value && !(!value && medias.length === 0)){
      const event = {
        persist: () => {return {}},
        target: {
          type: "change",
          //id: props.id,
          //name: props.name,
          value: medias
        }
      };
 
      onChange && onChange(event);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[medias]);

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

  const handleSelectedMedias = (selectedMedias?:Array<IMedia>|IMedia)=>{
    setMedias(mergeArray(medias,selectedMedias ));
  }

  const handleSwap = (first:IMedia, second:IMedia)=>{
    setMedias(exchange(first, second, medias));
  }

  const handleRemove = (media:IMedia)=>{
    setMedias([...remove(media, medias)]);
  }

  const mediasGrid =  (cols ?
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
  )


  return (
    <HoverablePaper 
      ref={ref}
      {...rest}
    >
      <div className = {classes.header}>
        <Typography variant="h5">
          {intl.get('media')}
        </Typography>
        
        <IconButton ref={anchorRef} onClick={()=>setMenuOpen(true)} id="setting-button"  size="small">              
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
                    <MenuItem onClick={handleEditAlts} id="alts-menu-items">
                      <ListItemIcon>
                        <MdiIcon iconClass="mdi-text-recognition" />
                      </ListItemIcon>
                      <ListItemText primary={intl.get('edit-alt-text')} />
                    </MenuItem>
                    <MenuItem onClick={handleClear} id="clear-menu-items">
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
            loading?
            [1,2,3,4,5,6].map(i=>{
              return (
                <Grid key={i} item xs={2}>
                  <Skeleton animation="wave" variant="rect" style={{paddingBottom:'100%'}} />
                </Grid>
              )
            })
            :mediasGrid
          }
        </Grid>
        {
          altsOpen && 
          <MediasPortletAltsDialog 
            medias={medias} 
            open = {altsOpen} 
            onClose={()=>setAltsOpen(false)}
            onChange = {(medias)=>setMedias(medias)}
          />
        }
        <div>{helperText}</div>
      </div>
    </HoverablePaper>
  )
})

export default MediasPortlet;
