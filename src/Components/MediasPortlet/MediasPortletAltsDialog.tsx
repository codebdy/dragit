import React from 'react';
import { makeStyles, Theme, createStyles, Grow, AppBar, Button, Dialog, DialogActions, DialogContent, IconButton, Toolbar, Typography, FormControl, InputAdornment, InputLabel, OutlinedInput, Tooltip } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import Spacer from '../common/Spacer';
import CloseIcon from '@material-ui/icons/Close';
import Intl from "react-intl-universal";
import Image from 'Components/common/Image';
import classNames from 'classnames';
import MdiIcon from '../common/MdiIcon';
import { IRxMedia } from 'Base/Model/IRxMedia';
import { cloneObject } from 'rx-drag/utils/cloneObject';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      minHeight:"300px",
      flexFlow:"column",
      minWidth:"400px",
    },
    tips:{
      padding:theme.spacing(2),
      color:theme.palette.text.secondary,
    },
    margin: {
      margin: theme.spacing(1),
    },
    row:{
      display:"flex",
    },
    imageSchell:{
      width:'80px',
      padding:theme.spacing(1),
      paddingLeft:theme.spacing(2),
    },
    inputSchell:{
      flex:1,
      padding:theme.spacing(0.2),
    },
    textField: {
      width:"calc(100% - 30px)",
    },
  }),
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return  <Grow ref={ref} {...props} />;
});


export default function MediasPortletAltsDialog(
  props:{
    medias:Array<IRxMedia>, 
    open:boolean, 
    onClose:()=>void, 
    onChange:(medias:Array<IRxMedia>)=>void,
  }
){
  const {open, onClose, onChange} = props;
  const classes = useStyles();
  const [medias, setMedias] = React.useState<Array<IRxMedia>>(cloneObject(props.medias));

  const handleChange = (alt:string, media:IRxMedia)=>{
    media.alt = alt;
    setMedias([...medias]);
  }

  const handleCopyToAll = ()=>{
    medias.forEach(media=>{
      media.alt = medias[0].alt;
    })
    setMedias([...medias]);
  }

  const handleConfirm = ()=>{
    onChange(medias)      
    onClose();
  }

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      TransitionComponent={Transition} 
      maxWidth="md"
      scroll = "paper"
      id="alts-dialog"
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {Intl.get('edit-alt-text')}
          </Typography>
          <IconButton color="inherit" onClick={onClose} aria-label="close" className={classes.closeButton}
            id="alt-dialog-close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent dividers className={classes.dialogContent}>
        <div className={classes.tips}>
          {Intl.get('alt-edit-tips')}
        </div>
        {
          medias.map((media, index)=>{
            return(
            <div className={classes.row} key={media.id + '-row'}>
              <div className = {classes.imageSchell}>
                <Image src={media.thumbnail}/>
              </div>
              <div className = {classes.inputSchell}>
                  <FormControl className={classNames(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor = {"alt-text-" + media.id}>{Intl.get("alt-text")}</InputLabel>
                    <OutlinedInput
                      id={"alt-text-" + media.id}
                      value={media.alt || ''}
                      onChange={(e)=>{
                        handleChange(e.target.value as string, media)
                      }}
                      endAdornment={
                        index === 0 &&
                        <InputAdornment position="end">
                          <Tooltip title={Intl.get("copy-to-all-images")}>
                            <IconButton
                              onClick={handleCopyToAll}
                              edge="end"
                            >
                              <MdiIcon iconClass="mdi-expand-all-outline"/>
                            </IconButton>

                          </Tooltip>
                        </InputAdornment>
                      }
                      labelWidth={70}
                    />
                  </FormControl>

                </div>
            </div>
            )
          })

        }
      </DialogContent>
      <DialogActions>
        <Spacer />
        <Button 
          size="large" 
          variant="outlined"
          onClick={onClose}
          id="alt-dialog-cancel"
        >
          {Intl.get('cancel')}
        </Button>          
        <Button  
          size="large" 
          variant="contained" 
          color="primary"
          onClick={handleConfirm}
          id="alt-dialog-confirm"
        >
          {Intl.get('confirm')} 
        </Button>
        <Spacer />
      </DialogActions>
    </Dialog>      
  )
}
