import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { commentFormSchema, CommentFormData } from '../formSchemas/commentFormSchema'; 

interface CommentFormProps {
  onSubmit: (data: CommentFormData) => void;
  initialValue?: string;
  isLoading?: boolean;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, initialValue = '', isLoading = false }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<CommentFormData>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: { content: initialValue },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          id="content"
          {...register('content')}
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
          disabled={isLoading}
        />
        {errors.content && <p className="text-red-600">{errors.content.message}</p>}
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md" disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}

export default CommentForm;
