import { Flex, Grid } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import React from 'react';
import { SideBar } from '../side-bar';
import { AutoLogoutComponent } from '../auto-logout-component';

export function DefaultLayout() {
  return (
    <AutoLogoutComponent>
      <Flex
        as="main"
        justifyContent="center"
        p={14}
        minHeight="100vh"
        overflow="clip"
      >
        <Grid
          width="100%"
          maxWidth="1440px"
          templateColumns="auto minmax(0, 1fr)"
          gap={14}
        >
          <SideBar />
          <Flex flexDirection="column">
            <Outlet />
          </Flex>
        </Grid>
      </Flex>
    </AutoLogoutComponent>
  );
}
