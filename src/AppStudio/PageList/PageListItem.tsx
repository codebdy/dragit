import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { useState } from 'react';
import PageAction from './PageAction';
import { IRxPage } from 'Base/Model/IRxPage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      display:'flex',
      justifyContent:'space-between',
      padding:theme.spacing(0.4, 2),
      borderBottom: theme.palette.divider + ' solid 1px',
      alignItems:'center',
      cursor:'pointer',
      minHeight: theme.spacing(6),
    },
  }),
);


export const PageListItem = observer((
  props:{
    page:IRxPage,
    onClick?:(event:React.MouseEvent<HTMLElement>)=>void,
  }
) => {
  const {page, onClick} = props;
  const [hover, setHover] = useState(false);
  const classes = useStyles();

  return (
    <div 
      className = {classes.root} 
      onClick={onClick}
      onMouseOver = {()=>{setHover(true)}}
      onMouseLeave = {()=>{setHover(false)}}
    >
      {page.name}
      {
        hover&&
        <div onClick={e=>{
          e.stopPropagation();
        }}>
          <PageAction onCloseMenu={()=>setHover(false)} />
        </div>
      }
    </div>
  );
})
