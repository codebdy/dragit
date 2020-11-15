import React from 'react';
import {makeStyles, Theme, createStyles, Switch, TextField} from '@material-ui/core';
import intl from 'react-intl-universal';
import { AttributeRow, RowLabel, RowValue } from './Attrebutebox/AttributeRow';

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
        <RowLabel>{intl.get("is-form-page")}</RowLabel>
        <RowValue>
        <Switch
          checked={settings.isFormPage}
          onChange={ (e)=>{onChange({...settings, isFormPage:e.target.checked})} }
          color="primary"
        />
        </RowValue>
      </AttributeRow>
      <AttributeRow>
      <RowLabel>{intl.get("api")}</RowLabel>
      <RowValue>
        <TextField
          size="small" 
          variant = "outlined" 
          value={api||''} 
          onChange={(e:any)=>{setApi(e.target.value)}} 
          onBlur={()=>onChange({...settings, api:api})}
          rows="2"
        />
      </RowValue>
      </AttributeRow>      
    </div>
    
  )
}
