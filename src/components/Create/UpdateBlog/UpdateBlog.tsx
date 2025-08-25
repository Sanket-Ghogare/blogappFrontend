import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateBlogPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | string | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/category/${id}`);
        if (res.ok) {
          const data = await res.json();
          setTitle(data.title);
          setContent(data.content);
          setImage(data.image);
        }
      } catch (err) {
        console.error("Error loading blog data:", err);
      }
    };
    fetchPost();
  }, [id]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image instanceof File) {
      formData.append("image", image);
    }

    setLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/update/${id}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.ok) {
        navigate("/home");
      } else {
        console.error("Failed to update post");
      }
    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderMediaPreview = () => {
    if (!image) return null;

    if (typeof image === "string") {
      return image.endsWith(".mp4") ? (
        <video controls className="h-64 sm:h-80 w-full object-contain rounded-lg shadow">
          <source src={image} type="video/mp4" />
        </video>
      ) : (
        <img
          src={image}
          alt="Blog Media"
          className="h-64 sm:h-80 w-full object-contain rounded-lg shadow"
        />
      );
    } else {
      return image.type.startsWith("video/") ? (
        <video controls className="h-64 sm:h-80 w-full object-contain rounded-lg shadow">
          <source src={URL.createObjectURL(image)} type={image.type} />
        </video>
      ) : (
        <img
          src={URL.createObjectURL(image)}
          alt="Preview"
          className="h-64 sm:h-80 w-full object-contain rounded-lg shadow"
        />
      );
    }
  };

  return (
    <div className="min-h-screen dark:bg-gray-900 bg-white text-black dark:text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Media Preview */}
        <div className="relative w-full mb-6">{renderMediaPreview()}</div>

        {/* Upload Overlay if no image */}
        {!image && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              onClick={() => document.getElementById("file_input")?.click()}
              className="bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 rounded-full p-4 cursor-pointer hover:bg-opacity-100 transition shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-600 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Upload + Update */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div
              onClick={() => document.getElementById("file_input")?.click()}
              className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition bg-white dark:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {image ? "Change Media" : "Upload Media"}
              </span>
              <input id="file_input" type="file" className="hidden" onChange={handleFileChange} />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Updating..." : "Update Blog"}
            </button>
          </div>

          {/* Title Input */}
          <div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter blog title..."
              className="w-full px-4 py-3 text-2xl font-semibold bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
            />
          </div>

          {/* Content Area */}
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tell your story..."
              className="w-full min-h-[200px] sm:min-h-[300px] resize-none px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-base sm:text-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlogPage;
