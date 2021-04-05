const config = {
  flickrApiKey: process.env.REACT_APP_FLICKR_API_KEY,
  itemsPerPage: parseInt(process.env.REACT_APP_PHOTOS_PER_PAGE!),
};

export default config;
