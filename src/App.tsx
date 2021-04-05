import React from "react";
import { AppBar, Box, Container, Toolbar, Typography } from "@material-ui/core";
import { InterestingPhotos } from "./components/PhotoStream/";

function App() {
  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <Typography variant={"h5"}>
            Flickr Photo Stream{" "}
            <Typography variant={"caption"}>
              - interesting photos for the most recent day
            </Typography>
          </Typography>{" "}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container maxWidth="lg">
        <Box my={3}>
          <InterestingPhotos />
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default App;
