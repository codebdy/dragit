import React, { Fragment, useEffect } from 'react';
import { makeStyles, Theme, createStyles, Paper, Divider, IconButton, Typography, ClickAwayListener, Grow, MenuItem, MenuList, Popper, ListItemIcon, ListItemText, Grid, Hidden } from '@material-ui/core';
import classNames from 'classnames';
import intl from 'react-intl-universal';
import MdiIcon from '../common/MdiIcon';
import { MediaMeta } from '../Medias/MediaGridListImage';
import { add, exchange, remove } from 'ArrayHelper';
import MediasPortletFeathureGrid from './MediasPortletFeathureGrid';
import MediasPortletColumnsGrid from './MediasPortletColumnsGrid';
import MediasPortletAltsDialog from './MediasPortletAltsDialog';
import { makeSpaceStyle } from '../Util';
import { Controller } from 'react-hook-form';
import resolveSkeleton from 'admin/views/Page/resolveSkeleton';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

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
    className?:any,
    cols?:number,
    onChange:(event:any)=>void,
    helperText?:string,
    id?:string,
    name?:string,
    spacingTop?:number,
    spacingRight?:number,
    spacingBottom?:number,
    spacingLeft?:number,
    style?:any,
    inputRef?:any,
  }, 
  ref:any
)=>{
  const{value, className, cols, onChange, helperText, name,
    style,
    spacingTop,
    spacingRight,
    spacingBottom,
    spacingLeft,
    inputRef,
     ...rest
  } = props;
  const classes = useStyles();
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [medias, setMedias] = React.useState<Array<MediaMeta>>(value? value :[]);
  const [altsOpen, setAltsOpen] = React.useState(false); 

  const mergedStyle = {
    ...style,
    marginTop : makeSpaceStyle(spacingTop),
    marginRight : makeSpaceStyle(spacingRight),
    marginBottom : makeSpaceStyle(spacingBottom),
    marginLeft : makeSpaceStyle(spacingLeft),    
  }

  useEffect(() => {
    setMedias(value? value :[])
  },[value]);
  
  useEffect(() => {
    if(medias !== value && !(!value && medias.length === 0)){
     /* const event = {
        persist: () => {return {}},
        target: {
          type: "change",
          //id: props.id,
          name: props.name,
          value: medias
        }
      };*/
 
      //console.log('useEffect', 'medias:', medias, 'value', value)
      onChange && onChange(medias);
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

  const handleSelectedMedias = (selectedMedias?:Array<MediaMeta>|MediaMeta)=>{
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
      id = {name}
      style={mergedStyle}      
      {...rest}
      className = { classNames(classes.portlet, className) }
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
    </Paper>
  )
})

const FormedMediasPortlet = React.forwardRef((props:any, ref:any)=>{
  const {control, value, ...rest} = props;
  const selectPage = (state: RootState) => state.page;
  const pageInStore = useSelector(selectPage);
  const skeletonView = resolveSkeleton('MediasPortlet');  

  return (
    pageInStore.modelLoading ? skeletonView :
    (control?
      <Controller
        as={MediasPortlet}
        control = {control}
        defaultValue = {value}
        value={value}
        {...rest}
        ref={ref}
      />
    :
    <MediasPortlet value={value} {...rest} ref = {ref}/>)
  )
})

export default FormedMediasPortlet;
