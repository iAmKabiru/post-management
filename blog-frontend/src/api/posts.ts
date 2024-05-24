import axios, { AxiosResponse } from 'axios';

export interface Post {
  id: number;
  title: string;
  content: string;
}

export const fetchPosts = async (): Promise<Post[]> => {
  const response: AxiosResponse = await axios.get('http://localhost:4000/posts');
  return response.data;
};

export const addPost = async (post: Omit<Post, 'id'>): Promise<Post> => {
  const response = await axios.post('http://localhost:4000/posts', post);
  return response.data;
};

export const fetchPostById = async (id: number): Promise<Post> => {
  const response: AxiosResponse = await axios.get(`http://localhost:4000/posts/${id}`);
  return response.data;
};

export const updatePost = async (post:Post): Promise<Post> => {
  const { id: _, ...postWithoutId } = post;
  const response = await axios.patch(`http://localhost:4000/posts/${post.id}`, postWithoutId);
  return response.data;
};
