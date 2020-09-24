import React, { Fragment } from 'react';
import Menu from '@material-ui/core/Menu';
import { Tooltip, IconButton, FormLabel, RadioGroup, FormControlLabel, Radio, Button, makeStyles, Theme, createStyles } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import { ListViewMetaItem } from './ListViewMetaItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      border: '1px solid #d3d4d5',
      
    },
    filterContainer: {
      display: 'flex',
      flexFlow: 'column',
    },

    scrollArea:{
      maxHeight:'300px',
      overflow:'auto',
      padding: '10px',
    },
    actionArea:{
      display:'flex',
      alignItems:'center',
      paddingTop:'20px',
      justifyContent:'flex-end',
    }

  }),
);

export default function ListViewFilter(props:{filters:Array<ListViewMetaItem>}) {
  const {filters} = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [value, setValue] = React.useState('female');
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip title="Filter list">
          <IconButton aria-label="filter list"  name="list-view-filter-icon-button" onClick={handleClick}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>

      <Menu
        id="filter-menu"
        classes = {{paper:classes.paper}}
        anchorEl={anchorEl}
        keepMounted
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div className={classes.filterContainer}>
      
          <div className={classes.scrollArea}>
            {
              filters?.map((filter, index)=>{
                return (
                  <Fragment key = {filter.slug}>
                    <FormLabel component="legend">{filter.label}</FormLabel>
                    <RadioGroup aria-label={filter.label} name={filter.slug} value={value} onChange={handleChange}>
                      {
                        filter.conditions?.map((condition: any)=>{
                          return (
                            <FormControlLabel key={filter.slug + '-' + condition.slug} value={condition.slug} control={<Radio />} label={condition.label} />
                          )
                        })
                      }
                    </RadioGroup>
                  </Fragment>
                )
              })
            }
          </div>
        
          <div className={classes.actionArea}>
            <Button size="large" >
              清空
            </Button>
            <Button size="large" color="primary">
              关闭
            </Button>
          </div>         
        </div>
      </Menu>
    </div>
  );
}
