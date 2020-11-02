import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles, AppBar, Dialog, IconButton, Toolbar, Typography, Button, DialogActions, DialogContent } from '@material-ui/core';
import MdiIcon from 'components/common/MdiIcon';
import { TransitionProps } from '@material-ui/core/transitions';
import Grow from '@material-ui/core/Grow/Grow';
import CloseIcon from '@material-ui/icons/Close';
import Intl from "react-intl-universal";
import Spacer from 'components/common/Spacer';
import MediasContent from './MediasContent';
import { MediaMeta } from './MediaGridListImage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width:"100%",
      paddingBottom:'100%',
      position:"relative",
      borderRadius:"5px",
      background:"rgba(93, 32, 255, 0.2)",
      cursor:"pointer",
      "&:hover":{
        background:"rgba(93, 32, 255, 0.3)",
      }
    },

    inner:{
      position:"absolute",
      width:"calc(100% - 20px)",
      height:"calc(100% - 20px)",
      border:"#5d78ff dashed 2px",
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

export default function MediaAdder(props:{onSelectMedias:(medias:Array<MediaMeta>)=>void}){
  const {onSelectMedias} = props;
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [selectedMedias, setSelectedMedias] = React.useState<Array<MediaMeta>>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelect = ()=>{
    onSelectMedias(selectedMedias);
    setOpen(false);
  }

  return (
    <Fragment>
      <div className={classes.root} onClick = {handleClickOpen}>
        <div className={classes.inner}>
          <MdiIcon iconClass="mdi-plus" color="#5d78ff" size="50"/>
        </div>
      </div>
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
          <MediasContent onSelectedChange = {setSelectedMedias} single = {false}/>
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
