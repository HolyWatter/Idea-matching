import axios from "axios";
import { API } from "../../config";
import { IdeaList, Comments } from "./interface";

export const getIdeaList = (query: string) => {
  if (localStorage.getItem("token")) {
    const response = axios({
      url: `${API.basic}/posting/all?orderBy=${query}`,
      headers: { Authorization: localStorage.getItem("token") },
    });
    return response;
  } else {
    const response = axios({
      url: `${API.basic}/posting/all?orderBy=${query}`,
    });
    return response;
  }
};

export const getIdeaDetail = async (router: string | string[] | undefined) => {
  const {data} = await axios<IdeaList[]>({
    url: `${API.basic}/posting/posting/${parseInt(router as string)}?orderBy=views`,
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  return data[0];
};


export const getComments = async (router: string | string[] | undefined) => {
  const {data} = await axios<Comments[]>({
    url: `${API.basic}/comments/${parseInt(router as string)}`,
    headers: {
      Authrization: localStorage.getItem("token"),
    },
  });
  return data;
};

export const postComment = async (
  id: string | string[] | undefined,
  text: string
) => {
  await axios.post(
    `${API.basic}/comments/create`,
    {
      post: id,
      description: text,
    },
    { headers: { Authorization: localStorage.getItem("token") } }
  );
};

export const postLike = async (id: string | string[] | undefined) => {
  await axios.post(
    `${API.basic}/posting/like/${id}`,
    {},
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }
  );
};

export const likeReply = async (id: number) => {
  await axios.post(
    `${API.basic}/replies/like/${id}`,
    {},
    { headers: { Authorization: localStorage.getItem("token") } }
  );
};

export const postReply = async (id : number ,  description : string) => {
  await axios.post(
    `${API.basic}/replies/create`,
    {
      comment: id,
      description: description,
    },
    { headers: { Authorization: localStorage.getItem("token") } }
  );
};

export const likeApi = async (id : number) => {
  axios.post(
    `${API.basic}/comments/like/${id}`,
    {},
    { headers: { Authorization: localStorage.getItem("token") } }
  );
};