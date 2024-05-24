import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import * as Dialog from '@radix-ui/react-dialog';
import PostForm from './PostForm';
import { PostFormData } from '../formSchemas/postFormSchema';


interface AddPostDialogProps {
  title: string;
  post?: PostFormData;
  onSubmit: (data: PostFormData) => void;
}

const AddPostDialog: React.FC<AddPostDialogProps> = ({ title, post, onSubmit }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="bg-green-500 text-white px-4 py-2 rounded-md">{title}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
        <Dialog.Content className="fixed bg-white p-6 w-1/3 rounded-md shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Dialog.Title className="text-lg font-bold mb-4">{title}</Dialog.Title>
          <PostForm onSubmit={onSubmit} />
          <Dialog.Close className="absolute top-2 right-2"><FontAwesomeIcon icon={faTimes} />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default AddPostDialog;
