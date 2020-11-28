import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles, AppBar, Dialog, IconButton, Toolbar, Typography, Button, DialogActions, DialogContent, useTheme } from '@material-ui/core';
import MdiIcon from 'components/common/MdiIcon';
import { TransitionProps } from '@material-ui/core/transitions';
import Grow from '@material-ui/core/Grow/Grow';
import CloseIcon from '@material-ui/icons/Close';
import Intl from "react-intl-universal";
import Spacer from 'components/common/Spacer';
import MediasContent from './MediasContent';
import { MediaMeta } from './MediaGridListImage';
import Image from 'components/common/Image'
import MediaGridListIconButton from './MediaGridListIconButton';
import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    singleImage:{
      position:'relative',
      cursor:'pointer',
    },

    mask:{
      position:'absolute',
      height:'calc(100% - 2px)',
      width:"100%",
      left:"0",
      top:"1px",
      background:"rgba(50,50,50, 0.3)",
      borderRadius:"5px",
      display:'flex',
      flexFlow:"column",
      justifyContent:"space-between",
    },

    removeButton:{
      position:'absolute',
      top:'0px',
      right:'0px',
    },

    root: {
      width:"100%",
      paddingBottom:'100%',
      position:"relative",
      borderRadius:"5px",
      background: fade(theme.palette.primary.main, 0.1),
      cursor:"pointer",
      "&:hover":{
        background:fade(theme.palette.primary.main, 0.2),
      }
    },

    inner:{
      position:"absolute",
      width:"calc(100% - 20px)",
      height:"calc(100% - 20px)",
      border:theme.palette.primary.main + " dashed 2px",
      //borderColor:theme.palette.primary.main,
      top:'10px',
      left:'10px',
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      borderRadius:'4px',
    },
    appBar: {
      position: 'relative',
      padding:"0",
    },
    title: {
      flex: 1,
    },
    closeButton:{
      marginRight:'-30px',
    },
    dialogContent:{
      display:'flex',
      padding:0,
    },
  }),
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return  <Grow ref={ref} {...props} />;
});

export default function MediaAdder(
  props:{
    value?:Array<MediaMeta>, 
    onSelectMedias:(medias?:Array<MediaMeta>)=>void, 
    single?:boolean,
    avatar?:boolean,
  }
){
  const {value, onSelectMedias, single, avatar} = props;
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const [selectedMedias, setSelectedMedias] = React.useState<Array<MediaMeta>>(value || []);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const firstValue = value && (value.length > 0 ? value[0] :  undefined);

  const handleSelect = ()=>{
    onSelectMedias([...selectedMedias]);
    setOpen(false);
  }

  return (
    <Fragment>
      {
        single && firstValue?
        <div 
          className={classes.singleImage}
          onClick = {handleClickOpen} 
          onMouseOver = {()=>setHover(true)}
          onMouseLeave = {()=>setHover(false)} 
        >
          <Image 
            style={{
              borderRadius:avatar ? '50%' :''
            }}
            src={firstValue?.thumbnail}
          />
          {
            hover && 
            <div className={classes.mask}>
              <div className={classes.removeButton}>
                <MediaGridListIconButton icon = "mdi-close" 
                  onClick={()=>onSelectMedias([])} 
                />
              </div>
            </div>
          }
        </div>
        :        
        <div className={classes.root} onClick = {handleClickOpen}>
          <div className={classes.inner}>
            <MdiIcon iconClass="mdi-plus" color={theme.palette.primary.main} size="50"/>
          </div>      
        </div>      
      }
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {Intl.get('medias')}
            </Typography>
            <IconButton color="inherit" onClick={handleClose} aria-label="close" className={classes.closeButton}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent dividers className={classes.dialogContent}>
          <MediasContent  onSelectedChange = {setSelectedMedias} single = {single}/>
        </DialogContent>
        <DialogActions>
          <Spacer />
          <Button onClick={handleClose} size="large" variant="outlined">
            {Intl.get('cancel')}
          </Button>          
          <Button onClick={handleSelect} size="large" variant="contained" color="primary"
            disabled = {selectedMedias.length === 0}
          >
            {Intl.get('select')} 
            {
              selectedMedias.length > 0 &&
              <Fragment>
                ({selectedMedias.length})
              </Fragment>
            }
          </Button>
          <Spacer />
        </DialogActions>
      </Dialog>      
    </Fragment>
  )
}
