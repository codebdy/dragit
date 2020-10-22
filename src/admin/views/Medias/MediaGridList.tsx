import React from 'react';
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
      padding:theme.spacing(5),
    }
  }),
);

export interface MediaMeta{
  id:string;
  img: string,
  title: string,
}

export default function MediasGridList(props:{loading:boolean, medias:Array<MediaMeta>}) {
  const {loading, medias} = props;
  const classes = useStyles();

  return (
    <Scrollbar permanent className={classes.scrollBar} >
      <Grid container className={classes.root} spacing={2}>
     
        {medias.map((tile:any) => (
          <Grid item key={tile.id} lg={2} sm={3} xs={4}>
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