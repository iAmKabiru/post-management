import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postFormSchema, PostFormData } from '../formSchemas/postFormSchema';


interface PostFormProps {
  onSubmit: (data: PostFormData) => void;
  post?: PostFormData;
}

const PostForm: React.FC<{ onSubmit: (data: PostFormData) => void }> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<PostFormData>({
    resolver: zodResolver(postFormSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          id="title"
          type="text"
          {...register('title')}
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
        />
        {errors.title && <p className="text-red-600">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          id="content"
          {...register('content')}
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
        />
        {errors.content && <p className="text-red-600">{errors.content.message}</p>}
      </div>

      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">Submit</button>
    </form>
  );
}

export default PostForm;
