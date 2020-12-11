import React, { Fragment } from 'react';
import { Tooltip, IconButton, FormLabel, RadioGroup, FormControlLabel, Radio, Button, makeStyles, Theme, createStyles, Popover } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import { ILabelItem } from '../../base/Model/ILabelItem';
import intl from 'react-intl-universal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      paddingBottom:theme.spacing(0.5),
    },

    filterContainer: {
      display: 'flex',
      flexFlow: 'column',
    },

    label:{
      marginTop:theme.spacing(1),
    },

    scrollArea:{
      maxHeight:'300px',
      overflow:'auto',
      padding: theme.spacing(1, 3),
    },

    actionArea:{
      display:'flex',
      alignItems:'center',
      justifyContent:'flex-end',
    }

  }),
);

export default function ListViewFilter(props:{filters:Array<ILabelItem>, values:any, onChange:(values:any)=>void}) {
  const {filters, values = {}, onChange} = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, filterSlug:string) => {
    values[filterSlug] = (event.target as HTMLInputElement).value;
    onChange({...values});
  };
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClear = ()=>{
    onChange({});
  }

  return (
    <div>
      {
        filters && filters.length > 0 &&
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list"  name="list-view-filter-icon-button" onClick={handleClick}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      }

      <Popover
        id="filter-menu"
        classes = {{paper:classes.paper}}
        anchorEl={anchorEl}
        keepMounted
        elevation={3}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}        
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div className={classes.filterContainer}>
      
          <div className={classes.scrollArea}>
            {
              filters?.map((filter, index)=>{
                return (
                  <Fragment key = {filter.slug}>
                    <FormLabel className={classes.label} component="div">{filter.label}</FormLabel>
                    <RadioGroup aria-label={filter.label} name={filter.slug} value={values[filter.slug] ||''} 
                      onChange={e=>handleChange(e, filter.slug)}
                    >
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
            <Button size="large" onClick={handleClear}>
              {intl.get('clear')}
            </Button>
            <Button size="large" color="primary" onClick={handleClose}>
              {intl.get('close')}
            </Button>
          </div>         
        </div>
      </Popover>
    </div>
  );
}
