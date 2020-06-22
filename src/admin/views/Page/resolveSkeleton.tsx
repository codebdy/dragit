import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const skeletons:{ [key: string]: any } = {

}

export default function resolveSkeleton(metaName:string){
  if(skeletons[metaName]){
    return skeletons[metaName];
  }

  return  (<Skeleton animation="wave" height={50} width="80%" />)
}