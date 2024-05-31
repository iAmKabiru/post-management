import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment } from '../api/comments';
import CommentForm from './CommentForm';
import { CommentFormData } from '../formSchemas/commentFormSchema';

interface AddCommentProps {
  post_id: number;
}

const AddCommentComponent: React.FC<AddCommentProps> = ({ post_id }) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync: addCommentMutation } = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
    }
  });

  const handleAddComment = async (data: CommentFormData) => {
    const dataWIthPostId = {"postId": post_id, ...data}
    await addCommentMutation(dataWIthPostId);
  };

  return (
    <div>
      <h3 className="text-lg font-bold mt-4">Add a Comment</h3>
      <CommentForm onSubmit={handleAddComment} />
    </div>
  );
};

export default AddCommentComponent;
