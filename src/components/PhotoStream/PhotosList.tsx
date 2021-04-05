import { Grid } from "@material-ui/core";
import { Photo } from "../../services/FlickerAPI";
import { PhotoCard } from "./";
import React from "react";

interface Props {
  photos: Photo[];
}
const PhotosList = ({ photos }: Props) => (
  <Grid container={true} spacing={2}>
    {photos?.map((photo, index) => (
      <Grid lg={3} md={4} sm={6} xs={12} item={true} key={index}>
        <PhotoCard photo={photo} />
      </Grid>
    ))}
  </Grid>
);

export default PhotosList;
