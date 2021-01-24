import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { Fragment, useState } from 'react';
import PageAction from './PageAction';
import { IRxPage } from 'Base/Model/IRxPage';
import { Button, CircularProgress, TextField } from '@material-ui/core';
import { useEffect } from 'react';
import intl from 'react-intl-universal';

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
    rightArea:{
      display:'flex',
    },
    save:{
      marginLeft:theme.spacing(1),
    }
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
  const [name, setName] = useState(page.name);
  const [editing, setEditing] = useState(false);
  const classes = useStyles();
  const loading = false;

  useEffect(()=>{
    setName(page.name)
  },[page.name])

  const handleEditName = ()=>{
    setEditing(true);
  }

  const handleFinishedEdit = ()=>{
    setEditing(false);
  }

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    const newValue = event.target.value as string;
    setName(newValue);
  }

  return (
    <div 
      className = {classes.root} 
      onClick={onClick}
      onMouseOver = {()=>{setHover(true)}}
      onMouseLeave = {()=>{setHover(false)}}
    >
      {
        editing 
        ? <Fragment>
            <TextField 
              autoFocus
              size = "small" 
              variant = "outlined" 
              value = {name === undefined ? '' : name} 
              onBlur = {handleFinishedEdit}
              onChange = {handleChange}
              onKeyUp = {e=>{
                if(e.key === 'Enter') {
                  handleFinishedEdit()
                }
              }
            }
            />
            <Button 
              aria-label="save" 
              className = {classes.save}
              variant = "outlined"
            >
              {intl.get('save')}
            </Button>
          </Fragment>
        : name
      }
      <div className={classes.rightArea}>
        {
          loading &&
          <CircularProgress size = {24}/>
        }
        {
          hover&& !editing &&
          <div onClick={e=>{
            e.stopPropagation();
          }}>
            <PageAction 
              onCloseMenu={()=>setHover(false)} 
              onEditName = {handleEditName}
            />
          </div>
        }      
      </div>

    </div>
  );
})
