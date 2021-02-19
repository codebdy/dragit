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

  console.log('MediasContent', mediasStore);

  useEffect(()=>{
    onSelectedChange&&onSelectedChange(mediasStore.selectedMeidas);
  },[mediasStore.selectedMeidas, onSelectedChange])

  return (
    <MediasStoreProvider value = {mediasStore}>
      <MediasContentInner onSelectedChange = {onSelectedChange} />
    </MediasStoreProvider>
  )
})
