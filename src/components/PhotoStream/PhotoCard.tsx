import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Link,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Photo } from "../../services/FlickerAPI";
const useStyles = makeStyles({
  root: {
    minHeight: "auto",
  },
  media: {
    height: 140,
  },
});

enum SizeSuffix {
  s = "s", //thumbnail	75	cropped square
  q = "q", //thumbnail	150	cropped square
  t = "t", //thumbnail	100
  m = "m", //	small	240
}

interface Props {
  photo: Photo;
}
const getPhotoUrl = (
  { server, id, secret }: Photo,
  size: SizeSuffix = SizeSuffix.m
) => `https://live.staticflickr.com/${server}/${id}_${secret}_${size}.jpg`;

const PhotoCard = ({ photo }: Props) => {
  const classes = useStyles();
  const ownerUrl = `https://www.flickr.com/photos/${photo.owner}`;
  const photoUrl = `${ownerUrl}/${photo.id}`;
  const photoSrc = getPhotoUrl(photo);
  const cardTitle = `${photo.title} by ${photo.ownername}`;
  return (
    <Card className={classes.root} variant={"outlined"}>
      <CardActionArea>
        <a href={photoUrl} target={"_blank"} rel="noreferrer">
          <CardMedia className={classes.media} image={photoSrc} />
        </a>
        <CardContent title={cardTitle}>
          {photo.title && (
            <Typography noWrap={true} variant={"subtitle1"}>
              <Link href={photoUrl} target={"_blank"} rel="noreferrer">
                {photo.title}
              </Link>
            </Typography>
          )}
          <Typography noWrap={true} variant={"subtitle2"}>
            {" by "}
            <Link href={ownerUrl} target={"_blank"} rel="noreferrer">
              {photo.ownername}
            </Link>
          </Typography>
          <Typography noWrap={true} variant={"caption"} component={"p"}>
            {photo.description?._content}
          </Typography>
          {photo.tags && (
            <Typography
              variant={"caption"}
              noWrap={true}
              color={"textSecondary"}
              component={"p"}
            >
              Tags: {photo.tags?.split(" ").join(", ")}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default PhotoCard;
