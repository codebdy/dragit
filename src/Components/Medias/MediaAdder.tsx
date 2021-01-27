import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core';
import MdiIcon from 'Components/Common/MdiIcon';
import Image from 'Components/Common/Image'
import MediaGridListIconButton from './MediaGridListIconButton';
import { fade } from '@material-ui/core/styles/colorManipulator';
import MediasSelectDialog from './MediasSelectDialog';
import { IMedia } from 'Base/Model/IMedia';
import { useDesign } from 'rx-drag/store/useDesign';

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
  }),
);

export default function MediaAdder(
  props:{
    value?:Array<IMedia>, 
    onSelectMedias:(medias?:Array<IMedia>)=>void, 
    single?:boolean,
    avatar?:boolean,
  }
){
  const {value, onSelectMedias, single, avatar} = props;
  const {isDesigning} = useDesign();
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [hover, setHover] = React.useState(false);

  const theme = useTheme();

  const handleClickOpen = () => {
    if(isDesigning){
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const firstValue = value && (value.length > 0 ? value[0] :  undefined);

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
      <MediasSelectDialog
        open = {open}
        value = {value}
        single = {single} 
        onClose = {handleClose}
        onSelectMedias = {onSelectMedias}
      />
    </Fragment>
  )
}
