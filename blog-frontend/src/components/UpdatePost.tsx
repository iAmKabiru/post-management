import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "../api/posts";
import { PostFormData } from "../formSchemas/postFormSchema";
import AddPostDialog from "./addPostDialog";

interface UpdatePostProps {
  id: number;
}

const UpdatePost: React.FC<UpdatePostProps> = ({id}) => {

    const queryClient = useQueryClient();

    const {mutateAsync: updatePostMutation} = useMutation({
        mutationFn: updatePost,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['post', id] });
        }
      })
      
      const handleUpdatePost = (data: PostFormData) => {
        const dataWIthId = {"id": id, ...data}
        updatePostMutation(dataWIthId);
      };

      return (
        <> 
        <AddPostDialog 
        onSubmit={handleUpdatePost} 
        title="Update Post"
        />
        
        </>
      )
}   


export default UpdatePost