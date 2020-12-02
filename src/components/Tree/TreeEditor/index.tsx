import { Button, Divider, Grid, IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { AxiosRequestConfig } from 'axios';
import withSkeleton from 'base/HOCs/withSkeleton';
import { useAxios } from 'base/Hooks/useAxios';
import { ITreeNode } from 'base/Model/ITreeNode';
import Portlet from 'components/Portlet';
import React, { useState } from 'react';
import intl from "react-intl-universal";
import TreeList from './TreeList';


const TreeEditor = React.forwardRef((
  props:{
    title:string,
    elevation:number,
    apiForGet:AxiosRequestConfig,
    apiForSave:AxiosRequestConfig,
    nameKey:string,
  }, 
  ref:any
)=>{
  const {apiForGet, apiForSave, nameKey = 'name', ...rest} = props;

  const [itemsGot, loading] = useAxios<Array<ITreeNode>>(apiForGet);
  const [configForSave, setConfigForSave] = useState<AxiosRequestConfig>();
  const [itemsJustSaved, saving] = useAxios<Array<ITreeNode>>(configForSave);

  const items = itemsJustSaved ? itemsJustSaved : itemsGot;

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
              <TreeList nodes={items} nameKey = {nameKey}/>
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