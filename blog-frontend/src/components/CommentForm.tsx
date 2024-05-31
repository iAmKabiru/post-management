import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { commentFormSchema, CommentFormData } from '../formSchemas/commentFormSchema'; 

interface CommentFormProps {
  onSubmit: (data: CommentFormData) => void;
  initialValue?: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, initialValue = ''}) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CommentFormData>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: { content: initialValue },
  });

  const handleFormSubmit = (data: CommentFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          id="content"
          {...register('content')}
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
        />
        {errors.content && <p className="text-red-600">{errors.content.message}</p>}
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
        Submit
      </button>
    </form>
  );
}

export default CommentForm;
