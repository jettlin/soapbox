import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { AppBar, Drawer, Grid, IconButton, Toolbar, Typography } from '@material-ui/core';
import { ExitToApp, Movie, Person } from '@material-ui/icons'

import { Login, getToken, getRole, VideoList, VideoEdit, logout } from './features';
import { RouteList } from './components';

const Root = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  & .MuiDrawer-paper {
    z-index: auto;
  }

  & .MuiDrawer-paperAnchorLeft {
    width: 240px;
  }
`;

const Sidebar = styled(Drawer)`
  width: 240px;
  flexShrink: 0;
`;

const Main = styled.main`
  flexGrow: 1;
  width: 100%;
  height: 100%;
  position: relative;
`;

const LogoutButton = styled(IconButton)`
  float: right;
`;

const App = () => {
  const dispatch = useDispatch();
  const jwt = useSelector(getToken);
  const role = useSelector(getRole);

  if (!jwt) return <Login />;

  const menuItems = [
    { name: 'Videos', icon: <Movie />, route: '/videos' }
  ];

  if (role === 'admin') menuItems.push({ name: 'Users', icon: <Person />, route: '/users' });

  return (
    <Root>
      <AppBar position="fixed">
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={11}>
              <Typography variant="h6">VideoEditor</Typography>
            </Grid>
            <Grid item xs={1}>
              <LogoutButton size="small" color="inherit" onClick={() => dispatch(logout())}>
                <ExitToApp fontSize="large" />
              </LogoutButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
        <Sidebar variant="permanent">
          <Toolbar />
          <RouteList routes={menuItems} />
        </Sidebar>
        <Main>
          <Toolbar />
          <Switch>
            <Route path="/users" exact><h1>User Container</h1></Route>
            <Route path="/videos/:id" exact><VideoEdit /></Route>
            <Route path="/videos" exact><VideoList /></Route>
            <Route path="/" exact><VideoList /></Route>
          </Switch>
        </Main>
    </Root>
  );
}

export default App;
