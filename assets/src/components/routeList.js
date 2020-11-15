import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

import { List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';

const LinkItem = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const RouteList = ({ routes = [] }) => {
  const loc = useLocation();

  const activeIcon = (
    <ListItemSecondaryAction>
      <ChevronRight />
    </ListItemSecondaryAction>
  );

  const items = routes.map(i => {
    const showArrow = (loc.pathname.startsWith(i.route) || (loc.pathname === "/" && i.route === "/videos"));

    return (
      <LinkItem to={i.route} key={i.name.toLowerCase()}>
        <ListItem button>
          <ListItemIcon>{i.icon}</ListItemIcon>
          <ListItemText>{i.name}</ListItemText>
          {showArrow && activeIcon}
        </ListItem>
      </LinkItem>
    );
  });

  return (
    <List>
      {items}
    </List>
  )
};

export default RouteList;
