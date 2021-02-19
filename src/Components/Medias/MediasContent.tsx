import React, { useEffect, useState } from "react";
import { IRxMedia } from "Base/Model/IRxMedia";
import { MediasStore, MediasStoreProvider } from "./MediasStore";
import {observer} from 'mobx-react';
import { MediasContentInner } from "./MediasContentInner";

export const  MediasContent = observer((
  props:{
    single?:boolean,
    onSelectedChange?:(medias:Array<IRxMedia>)=>void
  }
)=>{
  const {single, onSelectedChange} = props;
  const [mediasStore] = useState(new MediasStore(single));

  useEffect(()=>{
    onSelectedChange&&onSelectedChange(mediasStore.selectedMedias);
  },[mediasStore.selectedMedias, onSelectedChange])

  return (
    <MediasStoreProvider value = {mediasStore}>
      <MediasContentInner />
    </MediasStoreProvider>
  )
})
