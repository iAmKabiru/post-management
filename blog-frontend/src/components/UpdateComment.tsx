import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Dialog from '@radix-ui/react-dialog';
import { faPencil, faTimes } from '@fortawesome/free-solid-svg-icons';
import { updateComment } from "../api/comments";
import { CommentFormData } from "../formSchemas/commentFormSchema";
import CommentForm from "./CommentForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";


interface UpdateCommentProps {
  id: number;
  post_id: number;
  content: string;
}

const UpdateComment: React.FC<UpdateCommentProps> = ({ id, post_id, content }) => {

  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { mutateAsync: updateCommentMutation } = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      setOpen(false)
    }
  })

  const handleUpdateComment = (data: CommentFormData) => {
    const dataWIthId = { "id": id, "postId": post_id, ...data }
    updateCommentMutation(dataWIthId);
  };

  return (
    <>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger className="text-green-500">
          <FontAwesomeIcon icon={faPencil} />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
          <Dialog.Content className="fixed bg-white p-6 rounded-md shadow-lg w-1/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Dialog.Title className="text-lg font-bold mb-4">Update comment</Dialog.Title>
            <CommentForm onSubmit={handleUpdateComment} initialValue={content} />
            <Dialog.Close asChild>
              <button className="absolute top-2 right-2">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}


export default UpdateComment