import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateBlogPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/category/${id}`
        );
        if (response.ok) {
          const postData = await response.json();
          setTitle(postData.title);
          setContent(postData.content);
          setImage(postData.image);
        } else {
          throw new Error("Failed to fetch post data");
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image instanceof File) {
        formData.append("image", image); // Change 'file' to 'image'
      }
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/update/${id}`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        navigate("/home");
      } else {
        throw new Error("Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dark:bg-gray-800 dark:h-screen">
      <div className="relative dark:bg-gray-800">
        {image &&
          (typeof image === "string" ? (
            image.endsWith(".mp4") ? (
              <video src={image} controls className="w-full h-96"></video>
            ) : (
              <img
                src={image}
                alt="Current Blog Media"
                className="w-full h-96"
              />
            )
          ) : image.type.startsWith("video/") ? (
            <video
              src={URL.createObjectURL(image)}
              controls
              className="w-full h-96"
            ></video>
          ) : (
            <img
              src={URL.createObjectURL(image)}
              alt="Current Blog Media"
              className="w-full h-96"
            />
          ))}
      </div>
      <div>
        <form onSubmit={handleUpdate}>
          <div className="flex w-full dark:bg-gray-800 ">
            <div
              // className="mt-3 w-full flex dark:bg-gray-800"
              className="mt-2.5 flex border border-gray-300 rounded-full px-2 py-2 cursor-pointer w-fit dark:bg-gray-800"
              onClick={() => document.getElementById("file_input")?.click()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-black dark:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span className="text-sm text-gray-400 dark:bg-gray-800 mt-1.5">
                Upload
              </span>
              <input
                className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 hidden"
                aria-describedby="file_input_help"
                id="file_input"
                type="file"
                onChange={handleFileChange}
              />
            </div>
            {/* Full-width wrapper to make sure button aligns right */}
            <div className="w-full">
              <div className="flex justify-end pr-6">
                <button
                  type="submit"
                  className={`bg-blue-500 px-6 my-3 py-1 text-white rounded-md uppercase ${
                    isLoading ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  {isLoading ? "Updating..." : "Update"}
                </button>
              </div>
            </div>
          </div>
          <div className="pl-12 mt-2 dark:bg-gray-800 dark:text-white text-black">
            <input
              name="title "
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-2 ml-1 outline-none text-2xl dark:bg-gray-800 dark:text-white"
              type="text"
              placeholder="Title"
            />
          </div>
          <div className="my-3 mx-20 dark:bg-gray-800 dark:text-white text-black">
            <textarea
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="resize-none rounded-md p-2 focus:outline-none w-full text-xl dark:bg-gray-800"
              placeholder="Tell your story... "
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlogPage;
