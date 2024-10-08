import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchPosts, Post } from '../api/posts';
import AddPost from '../components/AddPost';
import Header from '../components/Header';

const PostListPage: React.FC = () => {

  const { data: posts, error, isLoading } = useQuery<Post[], Error>({ queryKey: ['posts'], queryFn: fetchPosts });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Header />
      <div className="mt-5 px-16">
        <div className='flex justify-end'>
          <AddPost />
        </div>

        <div className='post-list mt-5'>
          {posts?.map(post => (
            <div key={post.id}>
              <div className='card border p-5 mb-3'>
                <Link to={`/posts/${post.id}`} className="font-semibold text-lg capitalize text-gray-800">{post.title}</Link>
                <p className='mt-2'>{post.content}</p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}

export default PostListPage;
