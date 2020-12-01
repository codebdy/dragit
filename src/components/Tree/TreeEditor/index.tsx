import { Button, Divider, FormControlLabel, Grid, Switch } from '@material-ui/core';
import withSkeleton from 'base/HOCs/withSkeleton';
import Portlet from 'components/Portlet';
import React from 'react';
import intl from "react-intl-universal";


const TreeEditor = React.forwardRef((
  props:{
    title:string,
    elevation:number,
  }, 
  ref:any
)=>{
  const {...rest} = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.checked
  }; 
  
  return (
    <Portlet 
      withHeader={true} 
      {...rest}
      actions = {
        <Button variant = "contained" color = "primary" size = "large">{intl.get("save")}</Button>
      }
    >
      <Grid container>
        <Grid container item xs={5}>
          <Grid item xs={true}>
          tree<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          </Grid>
          <Divider orientation="vertical" flexItem />  

        </Grid>
        <Grid item xs={7}>
          item content
        </Grid>
      </Grid>
    </Portlet>

  )
})


export default withSkeleton(TreeEditor);
