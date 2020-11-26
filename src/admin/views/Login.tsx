import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles, Grid, Typography, InputAdornment, TextField, FormControl, IconButton, InputLabel, OutlinedInput, Checkbox, FormControlLabel, Button, createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core';
import background from "assets/img/background2.jpg";
import leftImage from "assets/img/design-team.png";
import { Visibility, VisibilityOff } from '@material-ui/icons';
import intl from "react-intl-universal";
import { useHistory } from 'react-router';
import { useAxios } from 'base/Hooks/useAxios';
import { AxiosRequestConfig } from 'axios';
import { API_LOGIN } from 'APIs/app';
import IAppInfo from 'base/IAppInfo';
import { useDispatch } from 'react-redux';
import { setAppInfoAction } from 'store/app/actions';
import { TOKEN_NAME } from 'utils/consts';
import { LIGHT } from 'store/theme/useThemeSettings';

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
      background: "#FFF",
      height:'60vh',
      minHeight:'460px',
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

interface CheckResult{
  success:boolean,
  appInfo:IAppInfo,
  errorMessage:string,
}

export default function Login(){
  const classes = useStyles();

  const [values, setValues] = useState<any>({
    account: 'demo',
    password: 'demo',
    showPassword: false,
  });

  const [rememberMe, setRememberMe] = useState(false);

  const [request, setRequest] = useState<AxiosRequestConfig>();
  const [authResult, checking] = useAxios<CheckResult>(request);
  const [error, setError] = useState<string>();

  const history = useHistory();
  const dispatch = useDispatch();

  const theme = responsiveFontSizes(createMuiTheme({
    palette: {
      type: LIGHT,

    },


    //shadows:[...useShadows()] as any
  }));
  useEffect(()=>{
    if(authResult?.success){
      if(rememberMe){
        localStorage.setItem(TOKEN_NAME, authResult.appInfo.authToken);        
      }else{
        localStorage.removeItem(TOKEN_NAME);
      }

      dispatch(setAppInfoAction(authResult.appInfo));
      history.push(authResult.appInfo.entryUrl);
    }
    if(authResult && !authResult.success){
      setError(authResult.errorMessage)
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authResult])

  const handleChange = (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleRememberMe = (event: React.ChangeEvent<HTMLInputElement>)=>{
    setRememberMe(event.target.checked);
  }

  const handleLogin = ()=>{
    //history.push("/admin/dashboard");
    setRequest({
      ...API_LOGIN,
      data:values
    })
  }

  
  return (
    <ThemeProvider theme={theme}>
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
                {error&&<span style={{color:'red'}}>{error}</span>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="name"
                  label={intl.get('user-name')}
                  value={values.account}
                  variant="outlined"
                  onChange={handleChange('account')}
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
                        checked={rememberMe}
                        name="rememberMe"
                        color="primary"
                        onChange={handleRememberMe}
                      />
                    }
                    label={<Typography variant="subtitle1" color="textSecondary"> {intl.get('remember-me')}</Typography>}
                  />
                  <a href="#forgot"> {intl.get('forgot-password')}</a>
              </Grid>
              <Grid item xs={6}>
                  <Button fullWidth variant="contained" color="primary" size = "large" 
                    style={{fontSize:'1.2rem'}}
                    disabled = {checking}
                    onClick = {handleLogin}
                  >
                    {intl.get('login')}
                  </Button>
              </Grid>            
            </Grid>
              
          </Grid>

        </Grid>
      </div>
    </ThemeProvider>
  )
}
