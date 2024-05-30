import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "../api/posts";
import { PostFormData } from "../formSchemas/postFormSchema";
import PostForm from "./PostForm";

interface UpdatePostProps {
  id: number,
  post: PostFormData
}

const UpdatePost: React.FC<UpdatePostProps> = ({id, post}) => {

    const queryClient = useQueryClient();

    const {mutateAsync: updatePostMutation} = useMutation({
        mutationFn: updatePost,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['post'] });
        }
      })
      

      const handleUpdatePost = async (data: PostFormData) => {
        try {
          const dataWIthId = {"id": id, ...data}
          const response = await updatePostMutation(dataWIthId)
          return response;
        } catch (error) {
          throw error;
        }
      }

      return (
        <> 
        <PostForm onSubmit={handleUpdatePost} title="Update Post"  post={post}/>
        </>
      )
}   


export default UpdatePost