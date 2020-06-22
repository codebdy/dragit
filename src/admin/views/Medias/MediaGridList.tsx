import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Image from 'components/common/Image'

import { Grid, Typography } from '@material-ui/core';
import Scrollbar from 'admin/common/Scrollbar';
//import tileData from './tileData';

const tileData = [
  {
    id:'1',
    img: '/static/images/grid-list/breakfast.jpg',
    title: 'Breakfast',
    author: 'jill111',
    featured: true,
  },
  {
    id:'2',
    img: '/static/images/grid-list/burgers.jpg',
    title: 'Tasty burger',
    author: 'director90',
  },
  {
    id:'3',
    img: '/static/images/grid-list/camera.jpg',
    title: 'Camera',
    author: 'Danson67',
  },
  {
    id:'4',
    img: '/static/images/grid-list/morning.jpg',
    title: 'Morning',
    author: 'fancycrave1',
    featured: true,
  },
  {
    id:'5',
    img: '/static/images/grid-list/hats.jpg',
    title: 'Hats',
    author: 'Hans',
  },
  {
    id:'6',
    img: '/static/images/grid-list/honey.jpg',
    title: 'Honey',
    author: 'fancycravel',
  },
  {
    id:'7',
    img: '/static/images/grid-list/vegetables.jpg',
    title: 'Vegetables',
    author: 'jill111',
    cols: 2,
  },
  {
    id:'8',
    img: '/static/images/grid-list/plant.jpg',
    title: 'Water plant',
    author: 'BkrmadtyaKarki',
  },
  {
    id:'9',
    img: '/static/images/grid-list/mushroom.jpg',
    title: 'Mushrooms',
    author: 'PublicDomainPictures',
  },
  {
    id:'10',
    img: '/static/images/grid-list/olive.jpg',
    title: 'Olive oil',
    author: 'congerdesign',
  },
  {
    id:'11',
    img: '/static/images/grid-list/star.jpg',
    title: 'Sea star',
    author: '821292',
  },
  {
    id:'12',
    img: '/static/images/grid-list/bike.jpg',
    title: 'Bike',
    author: 'danfador',
  },
  {
    id:'13',
    img: '/static/images/grid-list/bike.jpg',
    title: 'Bike',
    author: 'danfador',
  },
  {
    id:'14',
    img: '/static/images/grid-list/bike.jpg',
    title: 'Bike',
    author: 'danfador',
  },
  {
    id:'15',
    img: '/static/images/grid-list/bike.jpg',
    title: 'Bike',
    author: 'danfador',
  },
  {
    id:'16',
    img: '/static/images/grid-list/bike.jpg',
    title: 'Bike',
    author: 'danfador',
  },
  {
    id:'17',
    img: '/static/images/grid-list/bike.jpg',
    title: 'Bike',
    author: 'danfador',
  },
];

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
  }),
);

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function MediasGridList() {
  const classes = useStyles();

  return (
    <Scrollbar permanent className={classes.scrollBar} >
      <Grid container className={classes.root} spacing={2}>
     
        {tileData.map((tile:any) => (
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

    </Scrollbar>
  );
}