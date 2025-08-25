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
    <div className="min-h-screen dark:bg-gray-800 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Media Preview Section - Fully Responsive */}
        <div className="relative w-full mb-6">
          {file && file.type.startsWith("image/") ? (
            <img
              src={URL.createObjectURL(file)}
              className="w-full max-w-2xl mx-auto h-64 sm:h-80 object-contain rounded-lg shadow-lg"
              alt="Preview"
            />
          ) : file && file.type.startsWith("video/") ? (
            <video
              controls
              className="w-full max-w-2xl mx-auto h-64 sm:h-80 rounded-lg shadow-lg"
            >
              <source src={URL.createObjectURL(file)} type={file.type} />
            </video>
          ) : (
            <img
              src="https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
              className="w-full max-w-2xl mx-auto h-64 sm:h-80 object-cover rounded-lg shadow-lg opacity-50"
              alt="Default preview"
            />
          )}
          
          {/* Upload Overlay - Show when no file is selected */}
          {!file && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90 rounded-full p-4 cursor-pointer hover:bg-opacity-100 transition-all duration-200 shadow-lg"
                onClick={() => document.getElementById("file_input")?.click()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-600 dark:text-gray-300"
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
              </div>
            </div>
          )}
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Upload Button and Category Selection */}
          <div className="flex flex-col sm:flex-row gap-4 sm:items-start">
            {/* Upload Button */}
            <div className="flex-shrink-0">
              <div
                className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors bg-white dark:bg-gray-800"
                onClick={() => document.getElementById("file_input")?.click()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600 dark:text-gray-300"
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
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {file ? 'Change Media' : 'Upload Media'}
                </span>
                <input
                  className="hidden"
                  id="file_input"
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                />
              </div>
              {fileError && (
                <p className="text-red-500 text-sm mt-2">{fileError}</p>
              )}
            </div>

            {/* Category Selection */}
            <div className="flex-1 sm:max-w-xs">
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setCategoryError("");
                }}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Blog Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.type}>
                    {category.type}
                  </option>
                ))}
              </select>
              {categoryError && (
                <p className="text-red-500 text-sm mt-2">{categoryError}</p>
              )}
            </div>
          </div>

          {/* Title Input */}
          <div>
            <input
              name="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setTitleError("");
              }}
              className="w-full px-4 py-3 text-2xl sm:text-3xl font-semibold border-none outline-none bg-transparent placeholder-gray-400 dark:text-white text-gray-900 focus:ring-0"
              type="text"
              placeholder="Enter your blog title..."
            />
            <div className="h-px bg-gray-200 dark:bg-gray-600 mt-2"></div>
            {titleError && (
              <p className="text-red-500 text-sm mt-2">{titleError}</p>
            )}
          </div>

          {/* Content Textarea */}
          <div>
            <textarea
              name="content"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setContentError("");
              }}
              className="w-full px-4 py-4 text-lg resize-none border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[200px] sm:min-h-[300px]"
              placeholder="Tell your story..."
            />
            {contentError && (
              <p className="text-red-500 text-sm mt-2">{contentError}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-2 sm:px-8 sm:py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Publishing...
                </div>
              ) : (
                "Publish Blog"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;