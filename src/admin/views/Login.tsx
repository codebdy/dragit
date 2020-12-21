import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles, Grid, Typography, InputAdornment, TextField, FormControl, IconButton, InputLabel, OutlinedInput, Checkbox, FormControlLabel, createMuiTheme, ThemeProvider } from '@material-ui/core';
import background from "assets/img/background2.jpg";
import leftImage from "assets/img/design-team.png";
import { Visibility, VisibilityOff } from '@material-ui/icons';
import intl from "react-intl-universal";
import { useHistory } from 'react-router';
import { ADMIN_INDEX_URL, TOKEN_NAME } from 'utils/consts';
import { useAppStore, useThemeSettings } from 'store/helpers/useAppStore';
import { LIGHT } from 'store/ThemeSettings';
import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import SubmitButton from 'components/common/SubmitButton';

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
      minHeight:'480px',
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

// 定义查询语句
const LOGIN = gql`
  query loginQuery($login_name: String!, $password: String!){
    login(login_name:$login_name, password:$password){
      token,
      user{
        id
        login_name
        name
        is_demo
        is_supper
        avatar{
          id
          thumbnail
          title
          src
        }
        auths 
      }
    }
  }
`;

export default function Login(){
  const classes = useStyles();

  const [values, setValues] = useState<any>({
    account: 'demo',
    password: 'demo',
    showPassword: false,
  });

  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErroMessage] = useState('');
  const [login, { called, loading, error, data }] = useLazyQuery(LOGIN,{
    notifyOnNetworkStatusChange: true
  });
  
  const appStore = useAppStore();

  const history = useHistory();
  
  useEffect(()=>{
    if(called && !loading){
      if(error){
        console.log(error);
        setErroMessage(error.message);
      }
      if(data && !data.login){
        setErroMessage(intl.get('login-failure'));
      }
      if(data && data.login){
        if(rememberMe){
          localStorage.setItem(TOKEN_NAME, data.login.token);        
        }else{
          localStorage.removeItem(TOKEN_NAME);
        }

        appStore.setLoggedUser(data.login.user);
        appStore.setToken(data.login.token);
        history.push(ADMIN_INDEX_URL)
      }

    }
    console.log(data, error)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[called, loading, data, error])

  useEffect(()=>{
    setErroMessage('');
  },[values])


  const themeSettings = useThemeSettings();
  const theme = createMuiTheme({
    palette: {
      type: LIGHT,
      primary:{
        main: themeSettings.primary,
      },

    },
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

  const handleRememberMe = (event: React.ChangeEvent<HTMLInputElement>)=>{
    setRememberMe(event.target.checked);
  }

  const handleLogin = (event?: React.FormEvent<HTMLFormElement>)=>{
    login({
      variables:{
        login_name:values.account, 
        password:values.password
      }
    }); 
    event && event.preventDefault();
  }

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit = {handleLogin} className={classes.root}>
        
          <Grid container justify = "center">
            <Grid 
              container 
              item md={7} 
              sm={8}
              xs={10} 
              className = {classes.loginBox} 
              alignContent = "stretch"
              onKeyUp = {e=>{
                if(e.keyCode === 13) {
                  handleLogin()
                }
              }}
            >
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
                  <Typography variant="subtitle1" color="textSecondary">GraphQL Version {intl.get('login-tip')}</Typography>
                  {errorMessage&&<span style={{color:'red'}}>{errorMessage}</span>}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="name"
                    label={intl.get('user-name')}
                    value={values.account}
                    variant="outlined"
                    onChange={handleChange('account')}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant = "outlined" required>
                    <InputLabel htmlFor="standard-adornment-password" style={{background:"#fff",padding:"0 8px"}}>{intl.get('password')}</InputLabel>
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
                    <SubmitButton fullWidth variant="contained" color="primary" size = "large" 
                      style={{fontSize:'1.2rem'}}
                      submitting = {called && loading}
                      type = "submit"
                    >
                      {intl.get('login')}
                    </SubmitButton>
                </Grid>            
              </Grid>
                
            </Grid>

          </Grid>
      </form>
    </ThemeProvider>
  )
}
