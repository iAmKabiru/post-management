import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import * as Dialog from '@radix-ui/react-dialog';
import { postFormSchema, PostFormData } from '../formSchemas/postFormSchema';

interface PostFormProps {
  onSubmit: (data: PostFormData) => Promise<any>;
  post?: PostFormData;
  title: string;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit, title, post }) => {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<PostFormData>({
    resolver: zodResolver(postFormSchema),
  });


  useEffect(() => {
    if (post) {
      reset(post);
    }
  }, [post, reset]);

  const handleFormSubmit = async (data: PostFormData) => {
    try {
      const res = await onSubmit(data);
      reset();
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  return (
    <div>
      <button onClick={openDialog} className="bg-green-500 text-white px-4 py-2 rounded-md">
        {title}
      </button>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
          <Dialog.Content className="fixed bg-white p-6 w-1/3 rounded-md shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Dialog.Title className="text-lg font-bold mb-4">{title}</Dialog.Title>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
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
            <Dialog.Close asChild>
              <button onClick={closeDialog} className="absolute top-2 right-2">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default PostForm;
