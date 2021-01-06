import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import MediaAdder from 'components/Medias/MediaAdder';
import { IMedia } from 'base/Model/IMedia';
import withSkeleton from 'base/HOCs/withSkeleton';
import withFormField from 'components/common/withFormField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mediaSelected: {
      flex:1,
    },
    label:{
      padding:theme.spacing(1),
      fontSize:'1.1rem',
      color:theme.palette.text.primary,
    }

  }),
);

const MediaSelect = React.forwardRef((props: {
  name?:string,
  label?:string,
  value?:IMedia,
  width?:number,
  avatar?:boolean,
  isDeisgning?:boolean,
  style?:any,
  error?:string|boolean,
  helperText?:string,
  onChange?:(event:any)=>void,
}, ref:any)=>{
  const {name, label, value, helperText, error, width, avatar, isDeisgning, onChange, style, ...rest} = props;
  const classes = useStyles();

  const [media, setMedia] = React.useState(value);

  useEffect(()=>{
    setMedia(value);
  }, [value])

  const handleSelectMedias = (medias:any)=>{
    const currentValue = medias && medias.length >0 ? medias[0] :undefined;
    setMedia( currentValue );
    onChange && onChange(
      {
        name:name,
        target:{
          value:currentValue,
        }
      }
    )
  }

  return (
    <div className={classes.mediaSelected} ref = {ref} style={{width:width?width+'px':'', ...style}} {...rest}>
      {label && <div className = {classes.label}>{label}</div>}
      {
        <MediaAdder 
          value={media ? [media] :[]} 
          onSelectMedias={handleSelectMedias} 
          single 
          avatar = {avatar}
          isDeisgning = {isDeisgning}
        />      
      }

    </div>
  )
})

export default withFormField(withSkeleton(MediaSelect))
