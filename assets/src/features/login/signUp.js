import React, { useState } from 'react';
import styled from 'styled-components';

import { Modal, TextField, Grid, IconButton, Button } from '@material-ui/core';
import { Cancel } from '@material-ui/icons';
import { signUp } from './api';

const ModalBody = styled(Grid)`
  && {
    width: 400px;
    background-color: white;
    padding: 16px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &:focus {
      border: none;
      outline: none;
    }

    & .MuiGrid-grid-xs-2 {
      max-width: 100%;
    }

    & .MuiGrid-grid-xs-3 {
      max-width: 100%;
    }
  }
`;

const SubmitButton = styled(Button)`
  float: right;
`;

const SignUp = ({ show, onClose = () => { } }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [passErr, setPassErr] = useState(null);
  const [passConf, setPassConf] = useState('');
  const [passConfErr, setPassConfErr] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const handleClose = () => {
    setUser('');
    setPass('');
    setPassConf('');

    onClose();
  }

  const handleSubmit = () => {
    if (pass.length < 8) setPassErr('Must be at least 8 characters long');
    if (pass !== passConf) setPassConfErr('Does not match password');

    const data = {
      username: user,
      password: pass,
      password_confirmation: passConf,
    };

    setDisabled(true);

    signUp(data).then(resp => {
      console.log(resp);
    }).catch(err => {
      console.error(err);
    }).finally(() => {
      setDisabled(false);
      onClose();
    });
  };

  if (!show) return null;

  return (
    <Modal open={show} onClose={handleClose}>
      <ModalBody container direction="column" spacing={1}>
        <Grid item xs={1}>
        <IconButton size="small" onClick={handleClose}>
          <Cancel fontSize="large" />
        </IconButton>
        </Grid>
        <Grid item xs={3}>
          <TextField
            type="text"
            label="Username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            fullWidth
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            type="password"
            label="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            fullWidth
            disabled={disabled}
            helperText={passErr}
            error={!!passErr}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            type="password"
            label="Password Confirmation"
            value={passConf}
            onChange={(e) => setPassConf(e.target.value)}
            fullWidth
            disabled={disabled}
            helperText={passConfErr}
            error={!!passConfErr}
          />
        </Grid>
        <Grid item xs={2}>
          <SubmitButton
            variant="contained"
            color="primary"
            disabled={!(user && pass && passConf) || disabled}
            onClick={handleSubmit}
          >
            Submit
          </SubmitButton>
        </Grid>
      </ModalBody>
    </Modal>
  );
};

export default SignUp;
