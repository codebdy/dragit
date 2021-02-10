import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles, AppBar, Button, Dialog, DialogActions, DialogContent, IconButton, Toolbar, Typography, Grow } from '@material-ui/core';
import intl from "react-intl-universal";
import Spacer from 'Components/common/Spacer';
import { MediasContent } from './MediasContent';
import { Close } from '@material-ui/icons';
import { TransitionProps } from '@material-ui/core/transitions';
import { IRxMedia } from 'Base/Model/IRxMedia';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
      padding:"0",
    },
    toolbar:{
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(2),
    },
    title: {
      flex: 1,
    },
    dialogContent:{
      display:'flex',
      padding:0,
    },
    spacer: {
      flex:1,
    },
  }),
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return  <Grow ref={ref} {...props} />;
});


export default function MediasSelectDialog(
  props:{
    open:boolean,
    value?:Array<IRxMedia>,
    single?:boolean,
    onClose:()=>void,
    onSelectMedias:(medias?:Array<IRxMedia>)=>void, 
  }
){
  const {open,value, single, onClose, onSelectMedias} = props;
  const [selectedMedias, setSelectedMedias] = React.useState<Array<IRxMedia>>(value || []);
  const handleSelect = ()=>{
    onSelectMedias([...selectedMedias]);
    onClose();
  }

  const classes = useStyles();
  return (
    <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
    <AppBar className={classes.appBar}>
      <Toolbar className = {classes.toolbar}>
        <Typography variant="h6" className={classes.title}>
          {intl.get('medias')}
        </Typography>
        <IconButton color="inherit" onClick={onClose} aria-label="close" >
          <Close />
        </IconButton>
      </Toolbar>
    </AppBar>
    <DialogContent dividers className={classes.dialogContent}>
      <MediasContent  onSelectedChange = {setSelectedMedias} single = {single}/>
    </DialogContent>
    <DialogActions>
      <Spacer />
      <Button onClick={onClose} size="large" variant="outlined">
        {intl.get('cancel')}
      </Button>          
      <Button onClick={handleSelect} size="large" variant="contained" color="primary"
        disabled = {selectedMedias.length === 0}
      >
        {intl.get('select')} 
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
  )
}
