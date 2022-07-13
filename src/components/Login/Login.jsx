import React, { useState } from 'react';
import './login.css';
// import PropTypes from 'prop-types';
import callAPI from '../../utils/apiCaller';
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';
import './login.css';
import useStyles from './style.js';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Controls from '../../components/controls/Controls';
import Input from './Input';
import { GoogleLogin } from 'react-google-login';
import Icon from './icon';
import { useDispatch } from 'react-redux';
// import { AUTH } from '../../constants/actionTypes';
import { authenticate } from '../../redux/ducks/authenticate';
// import { signIn, signUp } from '../../components/redux/actions/auth';
import { useHistory, useNavigate } from 'react-router-dom';
import * as api from '../../api/index';
import { setSnackbar } from '../../redux/ducks/snackbar';
// require('dotenv').config();

const initialState = {
  name: '',
  username: '',
  password: '',
  confirmPassword: '',
};

const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   const history = useHistory();
  const classes = useStyles();
  const [form, setForm] = useState(initialState);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignedUp((prevIsSignedUp) => !prevIsSignedUp);
    setShowPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignedUp) {
      // dispatch(signUp(form, history));
      if (form.password === form.confirmPassword) {
        // const { data } = await api.signUp(form);
        const data = '';
        // console.log(data);
        if (!data) {
          dispatch(setSnackbar(true, 'error', 'Đã có lỗi xảy ra'));
        } else {
          // account is exsited
          if (data.message != 'successfully created') {
            dispatch(setSnackbar(true, 'error', 'Tên đăng nhập đã tồn tại!'));
          } else {
            // const { data } = await api.signIn(form);
            setToken(data.access_jwt_token);
            // dispatch(authenticate({ access_jwt_token: data.access_jwt_token }));
          }
        }
      } else {
        dispatch(setSnackbar(true, 'error', 'Mật khẩu không khớp'));
      }
    } else {
      const data = await api.signIn(form);

      if (data?.status != 200) {
        dispatch(setSnackbar(true, 'error', 'Đã có lỗi xảy ra'));
      } else {
        dispatch(authenticate({ token: data?.object?.token }));
        window.location.reload();
        // navigate('/song');
      }
    }
    // dispatch(signIn(form, history));
  };
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    const googleData = {
      result,
      token,
    };

    try {
      //   dispatch(authenticate(googleData));

      const profile = localStorage.getItem('profile');
      const token = JSON.parse(profile).token;
      const profileData = JSON.parse(profile).result;
      let isExistedAccount = null;
      await callAPI('api/account/loginGoogle', 'post', { token: token }).then(
        (res) => {
          // console.log(res);
          isExistedAccount = res.isExistedAccount;
        },
      );
      if (!isExistedAccount) {
        const payload = {
          username: profileData.googleId,
          password: profileData.email + 'ToLiShop',
          photo: profileData.imageUrl,
          name: profileData.name,
          email: profileData.email,
        };
        // const { data } = await api.signUp(payload);
      }
      // handle login
      //   const { data } = await api.signIn({
      //     username: profileData.googleId,
      //     password: profileData.email + 'ToLiShop',
      //   });
      //   setToken(data.access_jwt_token);
      //   dispatch(authenticate({ access_jwt_token: data.access_jwt_token }));

      // sign up data in database
      // const { res } = await api.signUp(form);
      // // console.log(res);
      // if (!res) {
      //   dispatch(setSnackbar(true, 'error', 'Đã có lỗi xảy ra'));
      // } else {
      //   // account is exsited
      //   if (res.message != 'successfully created') {
      //     dispatch(setSnackbar(true, 'error', 'Tên đăng nhập đã tồn tại!'));
      //   } else {
      //     const { res } = await api.signIn(form);
      //     setToken(res.access_jwt_token);
      //     dispatch(authenticate({ access_jwt_token: res.access_jwt_token }));
      //   }
      // }

      // history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => {
    alert('Đã có lỗi xảy ra trong quá trình đăng nhập. Thử lại sau!');
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {isSignedUp ? 'Đăng kí' : 'Đăng nhập'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignedUp && (
              <Input
                name="name"
                label="Họ tên"
                autoFocus
                handleChange={handleChange}
              />
            )}
            <Input
              name="username"
              label="Tên đăng nhập"
              type="text"
              handleChange={handleChange}
            />
            <Input
              name="password"
              label="Mật khẩu"
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
              handleChange={handleChange}
            />
            {isSignedUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                // handleChange={handleChange}
                type="password"
                handleChange={handleChange}
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignedUp ? 'Đăng kí' : 'Đăng nhập'}
          </Button>
          {/* <GoogleLogin
            clientId="760325754105-f20dtj8ttufvs00sufb4sc9fniq83apk.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Đăng nhập Google
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          /> */}
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignedUp
                  ? 'Đã có tài khoản? Đăng nhập'
                  : 'Chưa có tài khoản? Đăng kí'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
// Login.propTypes = {
//   setToken: PropTypes.func.isRequired,
// };
