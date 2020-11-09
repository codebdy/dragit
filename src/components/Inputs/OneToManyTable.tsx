import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { MediaMeta } from '../Medias/MediaGridListImage';
import Portlet from 'components/Portlet';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body:{
      padding:theme.spacing(2),
    },

  }),
);


const OneToManyTable = React.forwardRef((
  props: {
    value?:any
    className?:any,
    cols?:number,
    onChange:(event:any)=>void,
    helperText?:string,
    id?:string,
    name?:string,
    style?:any,
    inputRef?:any,
  }, 
  ref:any
)=>{
  const{value, className, cols, 
    onChange, 
    helperText, 
    name,
    style,
    inputRef,
     ...rest
  } = props;
  const classes = useStyles();
  const [medias, setMedias] = React.useState<Array<MediaMeta>>(value? value :[]);


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
          name: props.name,
          value: medias
        }
      };
 
      //console.log('useEffect', 'medias:', medias, 'value', value)
      onChange && onChange(event);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[medias]);


  return (
    <Portlet 
      ref={ref}
      id = {name}
      style={style}
      withHeader      
      {...rest}
      className = { className }
    >

      <div className={classes.body}>
        <div>{helperText}</div>
      </div>
    </Portlet>
  )
})

export default OneToManyTable;
