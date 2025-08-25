import { Link, useParams } from "react-router-dom";
import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface Post {
  image: string;
  _id: string;
  title: string;
  content: string;
  category: string;
  date: string;
  author: string;
}

interface Comment {
  _id: string;
  comments: string;
  postId: string;
  name: string;
  date: string;
}

const BlogPage: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const { id } = useParams<{ id: string }>();
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [newComment, setNewComment] = useState<string>("");
  const navigate = useNavigate();
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const username = localStorage.getItem("username");
    setCurrentUser(username);
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/category/${id}`
        );
        if (response.ok) {
          const postData = await response.json();
          setPost(postData);
          // console.log("postData", postData);
        } else {
          throw new Error("Failed to fetch post data");
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchPost();
    fetchcomment();
  }, [id]);

  const Delete = async (postId: string) => {
    const accessToken = localStorage.getItem("accessToken");

    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/delete/${postId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    navigate("/home");
  };

  const HandleComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!newComment.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }
    try {
      const username = localStorage.getItem("username");

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/comment/newcomment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: username,
            postId: id,
            comments: newComment,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not good");
      }

      setNewComment("");
      // console.log("Comment Posted");
      fetchcomment();
    } catch (error) {
      toast.error("error for comment ");
    }
  };

  const fetchcomment = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/comment/getcomment`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch comment data");
      }
      const comment = await response.json();
      setComments(comment.filter((comment: Comment) => comment.postId === id));
    } catch (error) {
      console.error("Error fetching comment data:", error);
    }
  };

  const DeleteComment = async (commentid: string) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/comment/deletecomment/${commentid}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        toast.success("Comment deleted");
        fetchcomment(); // Refresh comments after delete
      }
    } catch (error) {
      console.error("Error deleteing comment data:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  if (!post || !comments) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-800">
        <div className="text-xl dark:text-white">Loading...</div>
      </div>
    );
  }

  const isImage =
    post.image.endsWith(".jpg") ||
    post.image.endsWith(".jpeg") ||
    post.image.endsWith(".png");
  const isVideo =
    post.image.endsWith(".mp4") ||
    post.image.endsWith(".avi") ||
    post.image.endsWith(".mov");

  return (
    <div className="min-h-screen dark:bg-gray-800 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Media Section - Fully Responsive */}
        <div className="relative w-full mb-6">
          {isImage ? (
            <img
              className="w-full max-w-lg mx-auto h-80 object-contain rounded-lg shadow-lg"
              src={post.image}
              alt={post.title}
            />
          ) : isVideo ? (
            <video 
              controls 
              className="w-full max-w-lg mx-auto h-80 rounded-lg shadow-lg"
            >
              <source src={post.image} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              className="w-full max-w-lg mx-auto h-80 object-contain rounded-lg shadow-lg"
              src={post.image}
              alt={post.title}
            />
          )}
        </div>

        <hr className="border-gray-300 dark:border-gray-600 mb-6" />

        {/* Header Section with Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="order-2 sm:order-1">
            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
              Date: {formatDate(post.date)}
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 order-1 sm:order-2">
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
                post.author === currentUser ? "" : "hidden"
              }`}
            >
              <button className="outline-none p-1" onClick={() => Delete(post._id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                >
                  <path
                    fill="#e70d0d"
                    d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                  />
                </svg>
              </button>
            </div>

            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
                post.author === currentUser ? "" : "hidden"
              }`}
            >
              <Link to={`/update/${post._id}`} className="outline-none p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                >
                  <path
                    fill="#4a10f9"
                    d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Category */}
        <p className="text-gray-500 dark:text-gray-400 text-right text-sm sm:text-lg mb-4">
          Category: {post.category}
        </p>

        {/* Title */}
        <h1 className="text-center font-bold text-2xl sm:text-3xl md:text-4xl uppercase mb-6 dark:text-white text-black">
          {post.title}
        </h1>

        {/* Author */}
        <div className="mb-6">
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-400 dark:text-gray-300">
            Author: {post.author}
          </p>
        </div>

        {/* Content */}
        <div className="mb-10">
          <p className="text-base sm:text-lg leading-relaxed dark:text-white text-black">
            {post.content}
          </p>
        </div>

        {/* Comments Section */}
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 p-4 sm:p-6">
          {/* Add Comment */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 sm:w-10 sm:h-10 text-gray-600 dark:text-gray-400"
                viewBox="0 0 448 512"
                fill="currentColor"
              >
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
              </svg>
            </div>
            
            <div className="flex-1 flex flex-col sm:flex-row gap-3">
              <textarea
                name="comments"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 p-3 sm:p-4 text-sm sm:text-lg border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 dark:text-white resize-none min-h-[80px] sm:min-h-[60px]"
                placeholder="Comment here..."
              />
              <button
                onClick={HandleComment}
                disabled={!newComment.trim()}
                className={`bg-blue-500 hover:bg-blue-600 rounded-lg px-4 sm:px-6 py-2 sm:py-3 text-white text-sm sm:text-base font-medium transition-colors self-start sm:self-auto ${
                  !newComment.trim() ? "opacity-50 cursor-not-allowed hover:bg-blue-500" : ""
                }`}
              >
                Post
              </button>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment, index) => (
              <div
                key={index}
                className="bg-gray-200 dark:bg-gray-800 dark:border dark:border-gray-600 rounded-lg p-4 relative"
              >
                <button
                  className={`absolute top-3 right-3 p-1 hover:bg-gray-300 dark:hover:bg-gray-700 rounded transition-colors ${
                    comment.name === currentUser ? "" : "hidden"
                  }`}
                  onClick={() => DeleteComment(comment._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    viewBox="0 0 448 512"
                    fill="#e70d0d"
                  >
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                  </svg>
                </button>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-3">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-gray-600 dark:text-gray-400"
                      viewBox="0 0 448 512"
                      fill="currentColor"
                    >
                      <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                    </svg>
                    <p className="font-bold text-sm sm:text-lg dark:text-white text-black">
                      {comment.name}
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(comment.date)}
                  </p>
                </div>

                <p className="text-sm sm:text-base dark:text-white text-black leading-relaxed pl-6">
                  {comment.comments}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;