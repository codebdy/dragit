import React from 'react';
import {makeStyles, Theme, createStyles, Switch, FormControlLabel} from '@material-ui/core';
import intl from 'react-intl-universal';
import { AttributeRow } from '../Attrebutebox/AttributeRow';
import { IPageSchema } from 'base/Model/IPage';
import ApiEditor from './ApiEditor';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      //background:'rgba(0,0,0,0.3)',
      borderRadius:'3px',
      display:'flex',
      flexFlow:'column',
      flex:1,  
      height:'calc(100vh - 65px)',
      padding:theme.spacing(2),
    },

  }),
);

export default function FieldBox(props:{pageSchema?:IPageSchema, onChange:any}){
  const classes = useStyles();
  const {pageSchema, onChange} = props;

  return (
    <div className={classes.root}>
      <AttributeRow>
        <FormControlLabel
          control={
            <Switch
              checked={pageSchema?.isFormPage || false}
              onChange={ (e)=>{onChange({...pageSchema, isFormPage:e.target.checked})} }
              color="primary"
              //size="small" 
            />
          }
          label={intl.get("is-form-page")}
        />          
      </AttributeRow>
      <AttributeRow>
        <ApiEditor
          value = {pageSchema?.api}
          onChange={(api)=>onChange({...pageSchema, api:api})}
        />
      </AttributeRow>
    </div>
    
  )
}
