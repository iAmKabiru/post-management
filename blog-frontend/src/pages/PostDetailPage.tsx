import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPostById, Post } from '../api/posts';
import { fetchComments, Comment } from '../api/comments';
import AddCommentComponent from '../components/AddComment';
import UpdatePost from '../components/UpdatePost';
import UpdateComment from '../components/UpdateComment';
import Header from '../components/Header';


const PostDetailPage: React.FC = () => {
  const { post_id } = useParams<{ post_id: string }>();

  const { data: post, error: postError, isLoading: postLoading } = useQuery<Post, Error>({
    queryKey: ['post', post_id],
    queryFn: () => fetchPostById(Number(post_id)),
  });

  const { data: comments, error: commentsError, isLoading: commentsLoading } = useQuery<Comment[], Error>({
    queryKey: ['comments', post_id],
    queryFn: () => fetchComments(Number(post_id)),
  });

  if (postLoading || commentsLoading) return <div>Loading...</div>;
  if (postError || commentsError) return <div>Error loading data</div>;

  return (
    <div>

      <Header />

      <div className='px-16 mt-5'>

        <div className='card border p-5 mb-3'>
          <p className="font-semibold text-lg capitalize text-gray-800">{post?.title}</p>
          <p className='mt-2'>{post?.content}</p>
        </div>

        <div className='flex justify-end'>
          {post && <UpdatePost id={Number(post.id)} post={{ title: post.title, content: post.content }} />}
        </div>

        <h2 className="text-xl font-bold mt-6 mb-4">Comments</h2>
        <AddCommentComponent post_id={Number(post_id)} />


        <div className='commeny-list mt-5'>
          {comments?.map(comment => (
            <div key={comment.id}>
              <div className='card border p-5 mb-3'>
                <p className='mt-2'>{comment.content}</p>
                <UpdateComment id={comment.id} content={comment.content} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PostDetailPage;
