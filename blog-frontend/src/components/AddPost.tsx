import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPost } from "../api/posts";
import { PostFormData } from "../formSchemas/postFormSchema";
import AddPostDialog from "./addPostDialog";


const AddPost = () => {

    const queryClient = useQueryClient();

    const {mutateAsync: addPostMutation} = useMutation({
        mutationFn: addPost,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
      })
      
      const handleAddPost = (data: PostFormData) => {
        addPostMutation(data);
      };

      return (
        <> 
        <AddPostDialog 
        onSubmit={handleAddPost} 
        title="Add New Post"
        />
        </>
      )
}   


export default AddPost