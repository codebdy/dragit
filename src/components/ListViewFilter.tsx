import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import { Tooltip, IconButton, FormLabel, RadioGroup, FormControlLabel, Radio, Button, makeStyles, Theme, createStyles } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

export default function ListViewFilter() {
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
          <IconButton aria-label="filter list" onClick={handleClick}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
    <div className={classes.filterContainer}>
      
          <div className={classes.scrollArea}>
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
            <FormControlLabel value="disabled" control={<Radio />} label="(Disabled option)" />
          </RadioGroup>
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
            <FormControlLabel value="disabled" control={<Radio />} label="(Disabled option)" />
          </RadioGroup>
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
      </StyledMenu>
    </div>
  );
}
