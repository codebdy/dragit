import React, { useEffect, useRef } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Grid} from '@material-ui/core';
import Scrollbar from 'Common/Scrollbar';
import { MediaGridListFolder } from './MediaGridListFolder';
import { MediaGridListImage } from './MediaGridListImage';
import { IRxMedia } from 'Base/Model/IRxMedia';
import { useLazyQuery } from '@apollo/react-hooks';
import { QUERY_MEDIAS } from './MediasGQLs';
import { useShowAppoloError } from 'Store/Helpers/useInfoError';
import { observer } from 'mobx-react';
import { useMediasStore } from './MediasStore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      padding:theme.spacing(0, 2, 0, 2),
    },

    scrollBar:{
      paddingBottom:theme.spacing(2),
      paddingRight:theme.spacing(0.2),
      paddingTop:theme.spacing(0.2),
    },

    gridList: {
      flex:1,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },

    progress:{
      width:'100%',
      textAlign:'center',
      padding:theme.spacing(10),
    }
  }),
);

export const MediaGridList = observer(()=>{

  const classes = useStyles();
  const ref = useRef(null);  
  const [medias, setMedias] = React.useState<Array<IRxMedia>>([]);
  const [pageNumber, setPageNumber] = React.useState(0);
  const [hasMore, setHasMore] = React.useState(true);
  const mediasStore = useMediasStore();

  const folders = mediasStore?.selectedFolderNode?.children;
  
  const [excuteQuery, { loading:queryLoading, error:queryError, data:mediaData, refetch }] = useLazyQuery(QUERY_MEDIAS, {
    variables: { first:20, page:pageNumber + 1},
    notifyOnNetworkStatusChange: true
  });

  useShowAppoloError(queryError);

  useEffect(()=>{
    setMedias([...medias, ...(mediaData?.medias?.data||[])])
    setHasMore(mediaData?.medias?.paginatorInfo?.hasMorePages);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[mediaData])
  
  const doScroll = ()=>{
    if(!queryLoading && hasMore){
      //setqueryLoading(true);
      //refetch && refetch({ first:20, page:pageNumber + 1});
    }
  }

  const handleScroll = (scrollRef: React.RefObject<HTMLDivElement>)=>{
    let divElement = scrollRef.current;
    let innerElement:any = ref.current;
    let scrollRect = divElement?.getBoundingClientRect();
    let innerRect = innerElement?.getBoundingClientRect();
    let scrollBottom = (scrollRect?.y||0) + (scrollRect?.height||0);
    let innerBottom = (innerRect?.y||0) + (innerRect?.height||0);
    //console.log(scrollBottom - innerBottom )    
    if(scrollBottom - innerBottom >= 20){
      doScroll();
    }
    //e.defaultPrevented();
  }

  const handleSelect = ()=>{

  }

  return (
    <Scrollbar permanent 
      className={classes.scrollBar} 
      onScroll = {handleScroll}
    >
      <Grid container className={classes.root} spacing={2} ref={ref}>
        {folders?.map((folder:any, index) => (
          <Grid item key={folder.id + '-folder-' + folder.name} lg={2} sm={3} xs={4}>
            <MediaGridListFolder folder = {folder} />
          </Grid>
        ))}
     
        {medias?.map((media:IRxMedia, index) => (
          <Grid item key={media.id + '-image-' + index + '-' + media.title} lg={2} sm={3} xs={4}>
            <MediaGridListImage media = {media}/>
          </Grid>
        ))}
      </Grid>
      {
        queryLoading&&
        <div className = {classes.progress}>
          <CircularProgress />
        </div>
      }
    </Scrollbar>
  );
})
