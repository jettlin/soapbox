import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { TextField, Grid, Button } from '@material-ui/core';
import { login } from './slice';
import { getLoading } from './selector';
import SignUp from './signUp';

const Root = styled.div`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(yellow, orange);
  display: inline-block;
  position: relative;
`;

const LoginContainer = styled(Grid)`
  && {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    width: 400px;
    height: 200px;
    border: 2px solid grey;
  }
`;

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignup] = useState(false);
  const loading = useSelector(getLoading);

  const handleClick = () => {
    dispatch(login({ username, password }))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleClick();
    }
  }

  return (
    <Root>
      <LoginContainer container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="password"
            variant="outlined"
            label="Password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                disabled={loading}
                onClick={() => setShowSignup(true)}
              >
                Sign Up
              </Button>
            </Grid>
            <Grid item xs={5} />
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClick}
                disabled={loading}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </LoginContainer>
      <SignUp show={showSignUp} onClose={() => setShowSignup(false)} />
    </Root>
  );
};

export default Login;
