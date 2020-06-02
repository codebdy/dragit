import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
//import tileData from './tileData';

const tileData = [
  {
    img: '/static/images/grid-list/breakfast.jpg',
    title: 'Breakfast',
    author: 'jill111',
    cols: 2,
    featured: true,
  },
  {
    img: '/static/images/grid-list/burgers.jpg',
    title: 'Tasty burger',
    author: 'director90',
  },
  {
    img: '/static/images/grid-list/camera.jpg',
    title: 'Camera',
    author: 'Danson67',
  },
  {
    img: '/static/images/grid-list/morning.jpg',
    title: 'Morning',
    author: 'fancycrave1',
    featured: true,
  },
  {
    img: '/static/images/grid-list/hats.jpg',
    title: 'Hats',
    author: 'Hans',
  },
  {
    img: '/static/images/grid-list/honey.jpg',
    title: 'Honey',
    author: 'fancycravel',
  },
  {
    img: '/static/images/grid-list/vegetables.jpg',
    title: 'Vegetables',
    author: 'jill111',
    cols: 2,
  },
  {
    img: '/static/images/grid-list/plant.jpg',
    title: 'Water plant',
    author: 'BkrmadtyaKarki',
  },
  {
    img: '/static/images/grid-list/mushroom.jpg',
    title: 'Mushrooms',
    author: 'PublicDomainPictures',
  },
  {
    img: '/static/images/grid-list/olive.jpg',
    title: 'Olive oil',
    author: 'congerdesign',
  },
  {
    img: '/static/images/grid-list/star.jpg',
    title: 'Sea star',
    cols: 2,
    author: '821292',
  },
  {
    img: '/static/images/grid-list/bike.jpg',
    title: 'Bike',
    author: 'danfador',
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
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
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={5}>
        {tileData.map((tile:any) => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.author}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}