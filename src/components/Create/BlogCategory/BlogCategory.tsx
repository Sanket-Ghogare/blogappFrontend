import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import HomeImages from '../../Home/HomeImage/HomeImage';
import CreateBlogButton from '../CreateBlogButton/CreateBlogButton';
import Category from '../Category';
import PostCard from '../Posts/PostCard';

interface Post {
  image: string;
  _id: string;
  title: string;
  content: string;
  category: string;
  date: string;
  author: string;
}

const BlogCategory: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { category } = useParams<{ category: string }>();

  useEffect(() => {
    fetchData();
  }, [category]);

  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/searchcategory/${category}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
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
    <>
      <HomeImages />
      <CreateBlogButton />
      <div className="flex dark:bg-gray-800">
        <div>
          <Category />
        </div>
        <div className="sm:px-8 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {/* Show the "No data" message if there are no posts */}
            {posts.length === 0 ? (
              <div className="col-span-full text-center text-gray-600 dark:text-gray-300 mt-8">
                This category has no data yet.
              </div>
            ) : (
              posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCategory;
