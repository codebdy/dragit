import React, { useRef } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Image from 'components/common/Image'

import { CircularProgress, Grid, Typography } from '@material-ui/core';
import Scrollbar from 'admin/common/Scrollbar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      padding:theme.spacing(0, 2, 0, 2),
    },

    scrollBar:{
      paddingBottom:theme.spacing(2),
      paddingRight:theme.spacing(0.2),
    },

    title:{
      textAlign: "center",
      paddingTop:theme.spacing(1),
    },
    titleText:{
      fontSize: '0.85rem',
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

export interface MediaMeta{
  id:string;
  img: string,
  title: string,
}

export default function MediasGridList(props:{loading:boolean, medias:Array<MediaMeta>, onScrollToEnd:()=>void}) {
  const {loading, medias, onScrollToEnd} = props;
  const classes = useStyles();
  const ref = useRef(null);  
  
  const handleScroll = (scrollRef: React.RefObject<HTMLDivElement>)=>{
    let divElement = scrollRef.current;
    let innerElement:any = ref.current;
    let scrollRect = divElement?.getBoundingClientRect();
    let innerRect = innerElement?.getBoundingClientRect();
    let scrollBottom = (scrollRect?.y||0) + (scrollRect?.height||0);
    let innerBottom = (innerRect?.y||0) + (innerRect?.height||0);
    //console.log(scrollBottom - innerBottom )    
    if(scrollBottom - innerBottom >= 20){
      onScrollToEnd();
    }
    //e.defaultPrevented();
  }



  return (
    <Scrollbar permanent 
      className={classes.scrollBar} 
      onScroll = {handleScroll}
    >
      <Grid container className={classes.root} spacing={2} ref={ref}>
     
        {medias.map((tile:any, index) => (
          <Grid item key={tile.id + '-' + index} lg={2} sm={3} xs={4}>
            <Image src={tile.img} />
            <div className={classes.title}>
              <Typography color="textSecondary" className={classes.titleText}>
                {tile.title}
              </Typography>
            </div>
          </Grid>
        ))}
      </Grid>
      {
        loading&&
        <div className = {classes.progress}>
          <CircularProgress />
        </div>
      }
    </Scrollbar>
  );
}
