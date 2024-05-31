import axios from 'axios';

export interface Comment {
  id?: number;
  postId: number;
  content: string;
}

export const fetchComments = async (postId: number): Promise<Comment[]> => {
  const response = await axios.get(`http://localhost:4000/comments/${postId}`);
  return response.data;
};

export const addComment = async (comment: Comment): Promise<Comment> => {
  const { postId: _, ...commentWithoutPostId } = comment;
  const response = await axios.post(`http://localhost:4000/comments`, commentWithoutPostId);
  return response.data;
};

export const updateComment = async (comment: Comment): Promise<Comment> => {
  const { postId: _, ...commentWithoutPostId } = comment;
  const response = await axios.patch(`http://localhost:4000/comments/${commentWithoutPostId.id}`, commentWithoutPostId);
  return response.data;
};
