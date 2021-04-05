import axios, { AxiosRequestConfig } from "axios";
import { AppConfig } from "../utils";

type FailedResponse = {
  stat: "fail" | "ok";
  code?: number;
  message?: string;
};

type ApiResponse<T> = T & FailedResponse;

export type Photo = {
  id: string;
  secret: string;
  server: string;
  owner: string;
  ownername: string;
  title: string;
  description: { _content: string };
  tags: string;
};

export type PublicPhotos = {
  page: number;
  pages: number;
  perpage: number;
  total: number;
  photo: Photo[];
};
export type PhotosResult = {
  photos: PublicPhotos;
};

const client = axios.create({
  baseURL: "https://api.flickr.com/services/rest",
  method: "get",
  params: {
    api_key: AppConfig.flickrApiKey,
    format: "json",
    nojsoncallback: true,
  },
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!axios.isCancel(error)) {
      return Promise.reject(error);
    }
  }
);

const CancelToken = axios.CancelToken;
const requestWithCanceler = <T>(config: AxiosRequestConfig) => {
  const canceler = CancelToken.source();
  const request = () =>
    client.request<T>({
      ...config,
      cancelToken: canceler.token,
    });
  return [request, canceler] as const;
};

export const getInterestingPhotos = (page: number, itemsPerPage: number) =>
  requestWithCanceler<ApiResponse<PhotosResult>>({
    params: {
      method: "flickr.interestingness.getList",
      page: page,
      per_page: itemsPerPage,
      extras: "tags, owner_name, description",
    },
  });
