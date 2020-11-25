import React from 'react';
import { makeStyles, Theme, createStyles, Grid, Typography, InputAdornment, TextField, FormControl, IconButton, InputLabel, OutlinedInput, Checkbox, FormControlLabel, Button } from '@material-ui/core';
import background from "assets/img/background2.jpg";
import leftImage from "assets/img/design-team.png";
import { Visibility, VisibilityOff } from '@material-ui/icons';
import intl from "react-intl-universal";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width:'100%',
      height:'100%',
      backgroundImage:`url(${background})`,
      backgroundPosition:' 50%',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },

    loginBox:{
      background: theme.palette.background.default,
      height:'60vh',
      minHeight:'420px',
      boxShadow:theme.shadows[23],

    },

    leftImage:{
      background:"#f2f4f4",
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      flex:1,
      height:'100%',
    },

    rightLogin:{
      padding:theme.spacing(4),
    },

    title:{
      fontSize:'20px',
    },

    margin:{
      margin: theme.spacing(1),
    },

    rememberAndForgot:{
      display:'flex',
      justifyContent:'space-between',
      alignItems:"center",
    }

  }),
);

export default function Login(){
  const classes = useStyles();

  const [values, setValues] = React.useState<any>({
    amount: '',
    password: '',
    showPassword: false,
    rememberMe:false,
  });

  const handleChange = (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  
  return (
    <div className={classes.root}>
      <Grid container justify = "center">
        <Grid container item md={7} sm={8} xs={10} className = {classes.loginBox} alignContent = "stretch">
          <Grid item md={6} className = {classes.leftImage}>
            <img src={leftImage} alt="" width="80%"/>
          </Grid>
          <Grid container item lg={6} 
            className = {classes.rightLogin} 
            justify = "space-between" 
            alignItems="flex-start" 
            alignContent = "flex-start"
            spacing = {3}
          >
            <Grid item xs={12}>
              <h2 className = {classes.title} >{intl.get('login')}</h2>
              <Typography variant="subtitle1" color="textSecondary">{intl.get('login-tip')}</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                label={intl.get('user-name')}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant = "outlined">
                <InputLabel htmlFor="standard-adornment-password">{intl.get('password')}</InputLabel>
                <OutlinedInput
                  id="standard-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} className={classes.rememberAndForgot}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.rememberMe}
                      onChange={handleChange}
                      name="rememberMe"
                      color="primary"
                    />
                  }
                  label={<Typography variant="subtitle1" color="textSecondary"> {intl.get('remember-me')}</Typography>}
                />
                <a href="#forgot"> {intl.get('forgot-password')}</a>
            </Grid>
            <Grid item xs={6}>
                <Button fullWidth variant="contained" color="primary" size = "large" style={{fontSize:'1.2rem'}}>
                  {intl.get('login')}
                </Button>
            </Grid>            
          </Grid>
            
        </Grid>

      </Grid>
    </div>
  )
}
