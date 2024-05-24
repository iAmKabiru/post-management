import axios from 'axios';

export interface Comment {
  id: number;
  postId: number;
  content: string;
}

export const fetchComments = async (postId: number): Promise<Comment[]> => {
  const response = await axios.get(`http://localhost:4000/comments/${postId}`);
  return response.data;
};

export const addComment = async (comment: Omit<Comment, 'id'>): Promise<Comment> => {

  const response = await axios.post(`http://localhost:4000/comments`, comment);
  return response.data;
};

export const updateComment = async (comment: Comment): Promise<Comment> => {
  const response = await axios.put(`http://localhost:4000/comments/${comment.id}`, comment);
  return response.data;
};
