import PhotosList from "./PhotosList";
import InfiniteScroll from "react-infinite-scroller";
import React from "react";
import { useFlickerInterestingPhotos } from "./hooks";
import { AppConfig } from "./../../utils";
const InterestingPhotosContainer = () => {
  const { photos, hasMore, loadNextPage } = useFlickerInterestingPhotos(
    AppConfig.itemsPerPage
  );
  return (
    <InfiniteScroll loadMore={loadNextPage} pageStart={0} hasMore={hasMore}>
      <PhotosList photos={photos} />
    </InfiniteScroll>
  );
};
export default InterestingPhotosContainer;
