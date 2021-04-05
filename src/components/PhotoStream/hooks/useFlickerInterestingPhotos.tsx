import { useCallback, useEffect, useReducer, useRef } from "react";
import { CancelTokenSource } from "axios";
import { getInterestingPhotos, Photo } from "../../../services/FlickerAPI";

type PhotosState = {
  photos: Photo[];
  page: number;
  pages: number;
  isLoading: boolean;
};
const initialState: PhotosState = {
  photos: [],
  page: 0,
  isLoading: false,
  pages: 0,
};
type PhotosActions =
  | { type: "LOAD_START" }
  | { type: "LOAD_FAILED" }
  | { type: "LOAD_COMPLETE" }
  | {
      type: "LOAD_AND_ADD";
      payload: { photos: Photo[]; page: number; pages: number };
    };

const photosReducer = (state: PhotosState, action: PhotosActions) => {
  switch (action.type) {
    case "LOAD_START":
      return { ...state, isLoading: true };
    case "LOAD_FAILED":
    case "LOAD_COMPLETE":
      return { ...state, isLoading: false };
    case "LOAD_AND_ADD":
      return {
        ...state,
        isLoading: false,
        page: action.payload.page,
        pages: action.payload.pages,
        photos: [...state.photos, ...action.payload.photos],
      };
  }
  return state;
};

const useFlickerInterestingPhotos = (itemsPerPage = 4) => {
  const requestCanceler = useRef<CancelTokenSource>();

  const [{ photos, page, pages, isLoading }, dispatch] = useReducer(
    photosReducer,
    initialState
  );

  const cancel = () => requestCanceler.current?.cancel();

  const fetchPhotos = useCallback(
    async (page: number = 1) => {
      console.log("LOADING PAGE", page);
      dispatch({ type: "LOAD_START" });
      try {
        cancel();
        const [request, canceler] = getInterestingPhotos(page, itemsPerPage);
        requestCanceler.current = canceler;
        const res = await request();
        const photosResult = res?.data?.photos;
        const items = photosResult?.photo;
        const pages = photosResult?.pages;
        if (items) {
          dispatch({
            type: "LOAD_AND_ADD",
            payload: { photos: items, page: page, pages: pages },
          });
        } else {
          dispatch({ type: "LOAD_COMPLETE" });
        }
      } catch (e) {
        dispatch({ type: "LOAD_FAILED" });
        console.log("*** fetchPhotos ERROR", e);
      }
    },
    [itemsPerPage]
  );

  useEffect(() => {
    fetchPhotos();
    return () => cancel();
  }, [fetchPhotos]);

  const loadNextPage = useCallback(() => {
    fetchPhotos(page + 1);
  }, [fetchPhotos, page]);

  return {
    isLoading,
    photos,
    page,
    pages,
    loadNextPage,
    hasMore: page < pages && !isLoading,
  };
};

export default useFlickerInterestingPhotos;
