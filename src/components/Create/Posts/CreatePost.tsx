
import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';

interface Post {
  _id: string;
  title: string;
  image:string;
  content: string;
  category:string;
  date:string;
 author:string;
}


const CreatePost = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/blog`,{
        headers: {
          Authorization: `Bearer ${accessToken}`,        },
      });
      if (response.status === 401) {
        throw new Error('Unauthorized: Token not provided');
      }
      const data: Post[] = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 ss:gap-0 sm:gap-2">
    {posts.map(post => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default CreatePost;
