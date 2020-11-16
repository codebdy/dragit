import React from 'react';
import {makeStyles, Theme, createStyles, Switch, TextField, FormControlLabel} from '@material-ui/core';
import intl from 'react-intl-universal';
import { AttributeRow } from './Attrebutebox/AttributeRow';

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

export interface PageSettings{
  isFormPage:boolean;
  api:string;
}

export default function FieldBox(props:{settings?:PageSettings, onChange:any}){
  const classes = useStyles();
  const {settings = {isFormPage:false, api:''}, onChange} = props;
  const [api, setApi] = React.useState(settings.api);

  return (
    <div className={classes.root}>
      <AttributeRow>
        <FormControlLabel
          control={
            <Switch
              checked={settings.isFormPage}
              onChange={ (e)=>{onChange({...settings, isFormPage:e.target.checked})} }
              color="primary"
              //size="small" 
            />
          }
          label={intl.get("is-form-page")}
        />          
      </AttributeRow>
      <AttributeRow>
        <TextField variant="outlined"
          fullWidth
          size="small" 
          label={intl.get("api")}
          value={api||''} 
          onChange={(e:any)=>{setApi(e.target.value)}} 
          onBlur={()=>onChange({...settings, api:api})}
          multiline
          rows={3}
        ></TextField>
      </AttributeRow>      
    </div>
    
  )
}
