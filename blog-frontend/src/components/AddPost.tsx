import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPost } from "../api/posts";
import { PostFormData } from "../formSchemas/postFormSchema";
import PostForm from "./PostForm";


const AddPost = () => {

    const queryClient = useQueryClient();

    const {mutateAsync: addPostMutation} = useMutation({
        mutationFn: addPost,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
      })

      const handleAddPost = async (data: PostFormData) => {
        try {
          const response = await addPostMutation(data);
          return response;
        } catch (error) {
          throw error;
        }
      };

      return (
        <> 
          <PostForm onSubmit={handleAddPost} title="Add New Post" />
        </>
      )
}   


export default AddPost