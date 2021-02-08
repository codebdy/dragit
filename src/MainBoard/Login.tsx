import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles, Grid, Typography, InputAdornment, TextField, FormControl, IconButton, InputLabel, OutlinedInput, Checkbox, FormControlLabel, createMuiTheme, ThemeProvider } from '@material-ui/core';
import background from "assets/img/background2.jpg";
import leftImage from "assets/img/design-team.png";
import { Visibility, VisibilityOff } from '@material-ui/icons';
import intl from "react-intl-universal";
import { useHistory } from 'react-router';
import { INDEX_URL, TOKEN_NAME } from 'Utils/consts';
import { gql, useApolloClient, useLazyQuery, useMutation } from '@apollo/react-hooks';
import SubmitButton from 'Components/common/SubmitButton';
import { useDragItStore } from 'Store/Helpers/useDragItStore';
import { useThemeSettings } from "AppBoard/store/useThemeSettings";
import { LIGHT } from 'AppBoard/store/ThemeSettings';
import { useShowAppoloError } from 'Store/Helpers/useInfoError';
import { creatLink } from 'client';
import { QUERY_ME } from 'Base/GraphQL/LOGIN_GQLs';
import { observer } from 'mobx-react';


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
  mutation ($login_name: String!, $password: String!, $device_name:String!){
    login(login_name:$login_name, password:$password, device_name:$device_name)
  }
`;

export const Login = observer(()=>{
  const classes = useStyles();
  const client = useApolloClient();

  const [values, setValues] = useState<any>({
    account: 'demo',
    password: 'demo',
    showPassword: false,
  });

  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErroMessage] = useState('');
  const appStore = useDragItStore();
  const history = useHistory();

  const [queryMe, { loading:querying, data, error:queryError }] = useLazyQuery(gql`${QUERY_ME}`,{
    notifyOnNetworkStatusChange: true
  });

  useEffect(()=>{
    if(data){
      appStore.setLoggedUser(data.me);
      history.push(INDEX_URL)
    }
  }, [appStore, data, history]);

  const [excuteLogin, { loading }] = useMutation(LOGIN,{
    notifyOnNetworkStatusChange: true,
    onCompleted(data){
      if(data && data.login){
        const token = data.login;
        if(rememberMe){
          localStorage.setItem(TOKEN_NAME, token);        
        }else{
          localStorage.removeItem(TOKEN_NAME);
        }
        appStore.setToken(token);
        client.setLink(creatLink(token));
        queryMe();
      }
      else{
        setErroMessage(intl.get('login-failure'));
      }
      
    },
    onError(error){
      console.log(error);
      setErroMessage(error.message);
    }
  });

  useShowAppoloError(queryError);
  

  
  useEffect(()=>{
    setErroMessage('');
  },[values]);

  useEffect(()=>{
    if(appStore.loggedUser){
      history.push(INDEX_URL)
    }
  },[appStore.loggedUser, history]);


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
    excuteLogin({
      variables:{
        login_name:values.account, 
        password:values.password,
        device_name:navigator.platform||'Can not identify'
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
                if(e.key === 'Enter') {
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
                  <Typography variant="subtitle1" color="textSecondary">{intl.get('login-tip')}</Typography>
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
                      submitting = {loading || querying}
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
})
