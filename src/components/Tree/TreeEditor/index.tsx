import { Button, Divider, Grid, IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import withSkeleton from 'base/HOCs/withSkeleton';
import Portlet from 'components/Portlet';
import React from 'react';
import intl from "react-intl-universal";
import TreeList from './TreeList';


const TreeEditor = React.forwardRef((
  props:{
    title:string,
    elevation:number,
  }, 
  ref:any
)=>{
  const {...rest} = props;

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
          <Grid item container xs={true} direction="column">
            <Grid item>
              <TreeList />
            </Grid>
            
            <Grid item container justify = "center" alignContent = "center" direction = "column" xs = {true}>
              <IconButton>
                <Add />
              </IconButton>
            </Grid>
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
