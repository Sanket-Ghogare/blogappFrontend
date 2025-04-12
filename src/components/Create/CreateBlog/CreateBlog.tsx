import React, { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { categories } from "../../../Data/data";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  // Error states
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const [fileError, setFileError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileError(""); // Clear error when file is selected
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset errors
    setTitleError("");
    setContentError("");
    setFileError("");
    setCategoryError("");

    let hasError = false;

    // Validation checks
    if (!title.trim()) {
      setTitleError("Title is required.");
      hasError = true;
    }
    if (!content.trim()) {
      setContentError("Description is required.");
      hasError = true;
    }
    if (!file) {
      setFileError("Please upload an image or video.");
      hasError = true;
    }
    if (!category) {
      setCategoryError("Please select a category.");
      hasError = true;
    }

    if (hasError) return; // Stop if validation fails

    setLoading(true);
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);

    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/upload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseData = await response.json();
      if (response.ok) {
        toast.success("Blog Created Successfully");
        navigate("/home");
      } else {
        throw new Error("Failed to create blog");
      }
    } catch (error) {
      toast.error("Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dark:bg-gray-800 dark:h-screen">
      <div className="relative dark:bg-gray-800 ">
        {file && file.type.startsWith("image/") ? (
          <img
            src={URL.createObjectURL(file)}
            className="w-full sm:h-96 xxs:h-96 ss:h-64 xs:h-64 dark:bg-gray-800"
            alt="image"
          />
        ) : file && file.type.startsWith("video/") ? (
          <video
            controls
            className="w-full h-96 xxs:h-96 ss:h-64 xs:h-64 dark:bg-gray-800"
          >
            <source src={URL.createObjectURL(file)} type={file.type} />
          </video>
        ) : (
          <img
            src="https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
            className="sm:w-full sm:h-80 xxs:h-80 ss:h-64 xs:h-64 dark:bg-gray-800"
            alt="image"
          />
        )}
      </div>

      <div>
        <form onSubmit={handleSubmit} className="dark:bg-gray-800">
          <div className="flex dark:bg-gray-800">
            <div
           className="mt-3 flex items-center border border-gray-300 rounded-full px-4 py-1 cursor-pointer w-fit dark:bg-gray-800"
              onClick={() => document.getElementById("file_input")?.click()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mt-1 text-black dark:text-white"
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
              <span className="text-sm text-gray-400 dark:bg-gray-800 mt-1">
                Upload
              </span>
              <input
                className="hidden"
                id="file_input"
                type="file"
                onChange={handleFileChange}
              />
            </div>
          </div>
          {fileError && (
            <p className="text-red-500 text-sm mt-1">{fileError}</p>
          )}

          <div className="sm:ml-96 ss:ml-1 xs:ml-1 dark:bg-gray-800">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="block w-64 dark:bg-gray-800 text-gray-400 h-10 border rounded-lg"
            >
              <option value="">Select Your Blog Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.type}>
                  {category.type}
                </option>
              ))}
            </select>
            {categoryError && (
              <p className="text-red-500 text-sm mt-1">{categoryError}</p>
            )}
          </div>

          <div className="xxs:ml-10 sm:ml-10 ss:ml-8 xs:ml-8 mt-2 dark:bg-gray-800 bg-white">
            <input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-2 ml-1 outline-none text-2xl dark:bg-gray-800 dark:text-white"
              type="text"
              placeholder="Title"
            />
            {titleError && (
              <p className="text-red-500 text-sm mt-1 ml-10">{titleError}</p>
            )}
          </div>

          <div className="my-3 ml-8 dark:bg-gray-800 dark:text-white text-black">
            <textarea
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="resize-none rounded-md p-2 w-full text-xl dark:bg-gray-800 dark:text-white text-black"
              placeholder="Tell your story... "
            ></textarea>
            {contentError && (
              <p className="text-red-500 text-sm mt-1 ml-10">{contentError}</p>
            )}
          </div>

          <button
            type="submit"
            className={`bg-blue-500 h-8 px-3 mt-5 text-white float-right mr-5 rounded-md uppercase ${
              isLoading ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            {isLoading ? "Publishing..." : "Publish Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
